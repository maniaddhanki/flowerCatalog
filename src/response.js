const EOL = '\r\n';

const statusMessage = {
  200: 'OK',
  404: 'NOT FOUND'
};

class Response {
  #socket;
  #statusCode;
  #headers;

  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  set status(code) {
    this.#statusCode = code;
  }

  #headLine() {
    const message = statusMessage[this.#statusCode];
    return `HTTP/1.1 ${this.#statusCode} ${message}`;
  }

  setHeaders(key, value) {
    this.#headers[key] = value;
  }

  #writeHeaders() {
    const headers = Object.entries(this.#headers);
    headers.forEach(header => {
      this.#socket.write(`${header[0]}:${header[1]}${EOL}`)
    }
    );
  }

  send(content) {
    this.setHeaders('content-length', content.length);
    this.#socket.write(this.#headLine());
    this.#socket.write(EOL);
    this.#writeHeaders();
    this.#socket.write(EOL);
    this.#socket.write(content);
    this.#socket.end();
  }

  equals(otherResponse) {
    return otherResponse instanceof Response &&
      otherResponse.#socket === this.#socket &&
      otherResponse.#statusCode === this.#statusCode;
  }
}

module.exports = { Response };
