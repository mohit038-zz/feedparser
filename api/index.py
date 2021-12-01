from feedparser import parse
from flask import Flask, json, render_template, request, jsonify
app = Flask(__name__)

@app.route('/index', methods=['GET', 'POST'])
def parse_rss():
  try:
    url=request.args.get('url')
    feed = parse(url)
    return jsonify(feed)
  except: 
    return jsonify({'error': 'Invalid URL'})


if __name__ == "__main__":
  app.run(debug=True)
