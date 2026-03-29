"""
Генерирует временные TURN-credentials для WebRTC.
Использует HMAC-SHA1 механизм (совместим с coturn и большинством TURN серверов).
Скрывает IP пользователей через ретранслятор при звонках.
"""
import os
import time
import hmac
import hashlib
import base64
import json


CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
}

# Публичные TURN/STUN серверы как fallback (бесплатные)
PUBLIC_ICE_SERVERS = [
    {"urls": "stun:stun.l.google.com:19302"},
    {"urls": "stun:stun1.l.google.com:19302"},
    {"urls": "stun:stun.cloudflare.com:3478"},
    {
        "urls": [
            "turn:openrelay.metered.ca:80",
            "turn:openrelay.metered.ca:443",
            "turn:openrelay.metered.ca:443?transport=tcp",
            "turns:openrelay.metered.ca:443",
        ],
        "username": "openrelayproject",
        "credential": "openrelayproject",
    },
    {
        "urls": [
            "turn:relay.metered.ca:80",
            "turn:relay.metered.ca:443",
            "turns:relay.metered.ca:443",
        ],
        "username": "openrelayproject",
        "credential": "openrelayproject",
    },
]


def generate_turn_credentials(secret: str, username: str, ttl: int = 86400):
    """Генерирует временные TURN credentials по HMAC-SHA1."""
    timestamp = int(time.time()) + ttl
    turn_username = f"{timestamp}:{username}"
    mac = hmac.new(secret.encode(), turn_username.encode(), hashlib.sha1)
    credential = base64.b64encode(mac.digest()).decode()
    return turn_username, credential


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    turn_secret = os.environ.get('TURN_SECRET', '')
    turn_host = os.environ.get('TURN_HOST', '')

    user_id = event.get('headers', {}).get('X-User-Id', 'anonymous')

    ice_servers = list(PUBLIC_ICE_SERVERS)

    # Если настроен собственный TURN-сервер — добавляем его первым
    if turn_host and turn_secret:
        username, credential = generate_turn_credentials(turn_secret, user_id)
        private_turn = {
            "urls": [
                f"turn:{turn_host}:3478",
                f"turn:{turn_host}:3478?transport=tcp",
                f"turns:{turn_host}:5349",
            ],
            "username": username,
            "credential": credential,
        }
        ice_servers.insert(0, private_turn)

    return {
        'statusCode': 200,
        'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
        'body': json.dumps({
            'iceServers': ice_servers,
            'ttl': 86400,
            'relayOnly': True,
            'ipProtection': True,
        })
    }
