import {inject, injectable, Next, Provider} from '@loopback/core';
import {
  asMiddleware,
  HttpErrors,
  Middleware,
  MiddlewareContext,
  Response,
  RestMiddlewareGroups,
} from '@loopback/rest';
import {LoggerBindings} from '../keys';
import {LoggerService} from '../providers';

@injectable(
  asMiddleware({
    group: 'validationError',
    upstreamGroups: RestMiddlewareGroups.SEND_RESPONSE,
    downstreamGroups: RestMiddlewareGroups.CORS,
  }),
)
export class APIMiddlewareProvider implements Provider<Middleware> {
  constructor(@inject(LoggerBindings.LOGGER) protected logger: LoggerService) {}

  async value() {
    const middleware: Middleware = async (
      ctx: MiddlewareContext,
      next: Next,
    ) => {
      try {
        const requestTime = Date.now();
        const {request} = ctx;
        this.logger.logger.info(
          `Request ${request.method} ${
            request.url
          } started at ${requestTime.toString()}.
        Request Details
        Referer = ${request.headers.referer}
        User-Agent = ${request.headers['user-agent']}
        Remote Address = ${request.socket.remoteAddress}
        Remote Address (Proxy) = ${request.headers['x-forwarded-for']}`,
        );
        return await next();
      } catch (err) {
        return this.handleError(err);
      }
    };
    return middleware;
  }

  handleError(err: HttpErrors.HttpError): Response {
    this.logger.logger.error(`Request closed by error
    StatusCode = ${err.statusCode}
    message = ${err.message}
    error= ${JSON.stringify(err)}
    `);
    throw err;
  }
}
