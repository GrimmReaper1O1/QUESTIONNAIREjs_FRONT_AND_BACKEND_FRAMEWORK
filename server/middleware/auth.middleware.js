
           import jwt from 'jsonwebtoken';

              let auth = (req, res, next) => {
                // const authHeader = req.headers['authorization'];
                console.log('hey I got here');
                console.log(req.cookies);
                const token = req.cookies.token;
                console.log(token);
                
                console.log('auth', token);
                // if (!token) return res.status(403).json({ error: 'Token missing' });
               // uncomment the above line for oauthentication with propper ssl certificate impossible with self signed certificate due to browser restrictions. 
               next();
               // comment next() for ssl certificate
              //  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
              //   if (err) return res.status(401).json({ error: 'Invalid token' });
              //   req.user = user;

                // next();
                // });
                // uncomment for ssl certificat
              };
            
              export default auth;
 