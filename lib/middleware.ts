/**
 * Helper method to wait for a middleware to execute before continuing.
 * And to throw an error when an error happens in a middleware.
 */
export default function initMiddleware(middleware: any) {
    return (req:Request, res:Request) =>
      new Promise((resolve, reject) => {
        middleware(req, res, (result:object) => {
          if (result instanceof Error) {
            return reject(result)
          }
          return resolve(result)
        })
      })
}