# Static dev server that disables browser caching so edits show on reload.
# Usage: python3 serve.py [port]   (default 4173). Serves the folder this file is in.
import http.server, os, socketserver, sys
from functools import partial

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4173

class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Expires", "0")
        super().end_headers()

socketserver.TCPServer.allow_reuse_address = True
try:
    httpd = socketserver.TCPServer(("", PORT), partial(NoCache, directory=ROOT))
except OSError:
    sys.exit(f"Port {PORT} is busy. Something may already be serving it: try http://localhost:{PORT}/design-system.html\n"
             f"or start on another port: python3 serve.py {PORT + 1}")
print(f"Serving {ROOT}\nOpen http://localhost:{PORT}/design-system.html  (Ctrl+C to stop)")
with httpd:
    httpd.serve_forever()
