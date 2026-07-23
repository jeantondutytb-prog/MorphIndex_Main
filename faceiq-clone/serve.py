#!/usr/bin/env python3
"""Serveur local qui reproduit le comportement `cleanUrls` de Vercel.

Une requete sans extension (ex. /register) est servie via le fichier .html
correspondant (register.html), comme en production.
"""
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = int(os.environ.get("PORT", "8080"))
ROOT = os.path.dirname(os.path.abspath(__file__))


class CleanURLHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        local = super().translate_path(path)
        if os.path.isdir(local) or os.path.exists(local):
            return local
        root, ext = os.path.splitext(local)
        if not ext and os.path.isfile(local + ".html"):
            return local + ".html"
        return local


def main():
    os.chdir(ROOT)
    httpd = ThreadingHTTPServer(("", PORT), CleanURLHandler)
    print("  Serving http://localhost:%d (clean URLs enabled)" % PORT)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.server_close()


if __name__ == "__main__":
    main()
