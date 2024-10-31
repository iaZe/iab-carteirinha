from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from redis import Redis


class RateLimiter:
    def __init__(self, app=None, default_limits=None):
        self.limiter = None
        if app is not None:
            self.init_app(app, default_limits)

    def init_app(self, app, default_limits):
        self.limiter = Limiter(
            key_func=get_remote_address,
            app=app,
            default_limits=default_limits or ["5 per minute"],
            #storage_uri="redis://redis:6379"
        )

    def limit(self, limit_rule):
        return self.limiter.limit(limit_rule)
