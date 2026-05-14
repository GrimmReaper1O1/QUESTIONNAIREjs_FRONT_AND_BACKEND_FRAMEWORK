 import dotenv from 'dotenv';
        // dotenv.config({path: './../stuff.env'});
        import express from 'express';
        import loginRoutes from './routes/login.routes.js';
        import cookieParser from 'cookie-parser';
        import cors from 'cors';
        import auth from './middleware/auth.middleware.js';
        import https from 'https';
        import fs from 'fs';
        import authRoutes from './routes/auth.routes.js';
        import questionRoutes from './routes/question.routes.js';
        import fileRoutes from './routes/file.routes.js';
        import moduleRoutes from './routes/mod.routes.js';
        import amMDIvRoutes from './routes/admin.mod.invite.routes.js';
        import amMDRoutes from './routes/admin.mod.routes.js';
        import compRoutes from './routes/competition.secure.routes.js';
        import forumRoutes from './routes/forum.routes.js';
        import mdGRoutes from './routes/mod.group.routes.js';
        import profileRoutes from './routes/profile.routes.js';
        import reportRoutes from './routes/reports.routes.js';
        import reviewRoutes from './routes/review.routes.js';
        import sAmRoutes from './routes/site.admin.routes.js';
        import voteRoutes from './routes/votes.routes.js';



const httpsOptions = {
    key: fs.readFileSync('./certs/localhost+2-key.pem'), // Path to your private key
    cert: fs.readFileSync('./certs/localhost+2.pem') // Path to your certificate
};
          const app = express();
          app.use(express.json());
          app.use(express.urlencoded({ extended: true }));
          app.use(cors({
            origin: 'http://localhost', // change to 80 http or 8080 for https for production.
            credentials: false, // change to true for o auth

          }));
          app.use('/', loginRoutes);
          app.use(cookieParser(process.env.SECRET_KEY));
          app.use('/api/auth', auth);
          app.use('/api/auth', authRoutes);
          app.use('/api/auth/questions', questionRoutes);
          app.use('/api/auth/uploadFile', fileRoutes);
          // app.use('/api/auth/modules', moduleRoutes);
          // app.use('/api/auth/admin_module_invite_routes', amMDIvRoutes);
          // app.use('/api/auth/admin_module_routes', amMDRoutes);
          // app.use('/api/auth/competition', compRoutes);
          // app.use('/api/auth/forum', forumRoutes);
          // app.use('/api/auth/module_group', mdGRoutes);
          // app.use('/api/auth/profile', profileRoutes);
          // app.use('/api/auth/report', reportRoutes);
          // app.use('/api/auth/review', reviewRoutes);
          // app.use('/api/auth/site_admin', sAmRoutes);
          // app.use('/api/auth/vote', voteRoutes);



          const server = https.createServer(httpsOptions, app); // Use 'app' if Express is used, otherwise a request handler function

          const PORT = process.env.PORT || 5000;
          // server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      app.listen(PORT, 'localhost', () => { console.log(`server running at port ${PORT}`)});
