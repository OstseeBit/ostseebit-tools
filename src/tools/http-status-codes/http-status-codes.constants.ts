export const codesByCategories: {
  id: '1xx' | '2xx' | '3xx' | '4xx' | '5xx'
  codes: {
    code: number
    name: string
    type: 'HTTP' | 'WebDav'
  }[]
}[] = [
  {
    id: '1xx',
    codes: [
      {
        code: 100,
        name: 'Continue',
        type: 'HTTP',
      },
      {
        code: 101,
        name: 'Switching Protocols',
        type: 'HTTP',
      },
      {
        code: 102,
        name: 'Processing',
        type: 'WebDav',
      },
      {
        code: 103,
        name: 'Early Hints',
        type: 'HTTP',
      },
    ],
  },
  {
    id: '2xx',
    codes: [
      {
        code: 200,
        name: 'OK',
        type: 'HTTP',
      },
      {
        code: 201,
        name: 'Created',
        type: 'HTTP',
      },
      {
        code: 202,
        name: 'Accepted',
        type: 'HTTP',
      },
      {
        code: 203,
        name: 'Non-Authoritative Information',
        type: 'HTTP',
      },
      {
        code: 204,
        name: 'No Content',
        type: 'HTTP',
      },
      {
        code: 205,
        name: 'Reset Content',
        type: 'HTTP',
      },
      {
        code: 206,
        name: 'Partial Content',
        type: 'HTTP',
      },
      {
        code: 207,
        name: 'Multi-Status',
        type: 'WebDav',
      },
      {
        code: 208,
        name: 'Already Reported',
        type: 'WebDav',
      },
      {
        code: 226,
        name: 'IM Used',
        type: 'HTTP',
      },
    ],
  },
  {
    id: '3xx',
    codes: [
      {
        code: 300,
        name: 'Multiple Choices',
        type: 'HTTP',
      },
      {
        code: 301,
        name: 'Moved Permanently',
        type: 'HTTP',
      },
      {
        code: 302,
        name: 'Found',
        type: 'HTTP',
      },
      {
        code: 303,
        name: 'See Other',
        type: 'HTTP',
      },
      {
        code: 304,
        name: 'Not Modified',
        type: 'HTTP',
      },
      {
        code: 305,
        name: 'Use Proxy',
        type: 'HTTP',
      },
      {
        code: 306,
        name: 'Switch Proxy',
        type: 'HTTP',
      },
      {
        code: 307,
        name: 'Temporary Redirect',
        type: 'HTTP',
      },
      {
        code: 308,
        name: 'Permanent Redirect',
        type: 'HTTP',
      },
    ],
  },
  {
    id: '4xx',
    codes: [
      {
        code: 400,
        name: 'Bad Request',
        type: 'HTTP',
      },
      {
        code: 401,
        name: 'Unauthorized',
        type: 'HTTP',
      },
      {
        code: 402,
        name: 'Payment Required',
        type: 'HTTP',
      },
      {
        code: 403,
        name: 'Forbidden',
        type: 'HTTP',
      },
      {
        code: 404,
        name: 'Not Found',
        type: 'HTTP',
      },
      {
        code: 405,
        name: 'Method Not Allowed',
        type: 'HTTP',
      },
      {
        code: 406,
        name: 'Not Acceptable',
        type: 'HTTP',
      },
      {
        code: 407,
        name: 'Proxy Authentication Required',
        type: 'HTTP',
      },
      {
        code: 408,
        name: 'Request Timeout',
        type: 'HTTP',
      },
      {
        code: 409,
        name: 'Conflict',
        type: 'HTTP',
      },
      {
        code: 410,
        name: 'Gone',
        type: 'HTTP',
      },
      {
        code: 411,
        name: 'Length Required',
        type: 'HTTP',
      },
      {
        code: 412,
        name: 'Precondition Failed',
        type: 'HTTP',
      },
      {
        code: 413,
        name: 'Payload Too Large',
        type: 'HTTP',
      },
      {
        code: 414,
        name: 'URI Too Long',
        type: 'HTTP',
      },
      {
        code: 415,
        name: 'Unsupported Media Type',
        type: 'HTTP',
      },
      {
        code: 416,
        name: 'Range Not Satisfiable',
        type: 'HTTP',
      },
      {
        code: 417,
        name: 'Expectation Failed',
        type: 'HTTP',
      },
      {
        code: 418,
        name: 'I\'m a teapot',
        type: 'HTTP',
      },
      {
        code: 421,
        name: 'Misdirected Request',
        type: 'HTTP',
      },
      {
        code: 422,
        name: 'Unprocessable Entity',
        type: 'HTTP',
      },
      {
        code: 423,
        name: 'Locked',
        type: 'HTTP',
      },
      {
        code: 424,
        name: 'Failed Dependency',
        type: 'HTTP',
      },
      {
        code: 425,
        name: 'Too Early',
        type: 'HTTP',
      },
      {
        code: 426,
        name: 'Upgrade Required',
        type: 'HTTP',
      },
      {
        code: 428,
        name: 'Precondition Required',
        type: 'HTTP',
      },
      {
        code: 429,
        name: 'Too Many Requests',
        type: 'HTTP',
      },
      {
        code: 431,
        name: 'Request Header Fields Too Large',
        type: 'HTTP',
      },
      {
        code: 451,
        name: 'Unavailable For Legal Reasons',
        type: 'HTTP',
      },
    ],
  },
  {
    id: '5xx',
    codes: [
      {
        code: 500,
        name: 'Internal Server Error',
        type: 'HTTP',
      },
      {
        code: 501,
        name: 'Not Implemented',
        type: 'HTTP',
      },
      {
        code: 502,
        name: 'Bad Gateway',
        type: 'HTTP',
      },
      {
        code: 503,
        name: 'Service Unavailable',
        type: 'HTTP',
      },
      {
        code: 504,
        name: 'Gateway Timeout',
        type: 'HTTP',
      },
      {
        code: 505,
        name: 'HTTP Version Not Supported',
        type: 'HTTP',
      },
      {
        code: 506,
        name: 'Variant Also Negotiates',
        type: 'HTTP',
      },
      {
        code: 507,
        name: 'Insufficient Storage',
        type: 'HTTP',
      },
      {
        code: 508,
        name: 'Loop Detected',
        type: 'HTTP',
      },
      {
        code: 510,
        name: 'Not Extended',
        type: 'HTTP',
      },
      {
        code: 511,
        name: 'Network Authentication Required',
        type: 'HTTP',
      },
    ],
  },
];
