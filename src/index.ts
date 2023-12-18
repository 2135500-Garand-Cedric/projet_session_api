/**
 * Pre-start is where we want to place things that must run BEFORE the express 
 * server is started. This is useful for environment variables, command-line 
 * arguments, and cron-jobs.
 */

// NOTE: DO NOT IMPORT ANY SOURCE CODE HERE
import path from 'path';
import dotenv from 'dotenv';
import { parse } from 'ts-command-line-args';


// **** Types **** //

interface IArgs {
  env: string;
}


// **** Setup **** //

// Command line arguments
const args = parse<IArgs>({
  env: {
    type: String,
    defaultValue: 'development',
    alias: 'e',
  },
});

// Set the env file
const result2 = dotenv.config({
  path: path.join(__dirname, `../env/${args.env}.env`),
});
if (result2.error) {
  throw result2.error;
}

import logger from 'jet-logger';

import EnvVars from '@src/constants/EnvVars';
import server from './server';
import { connect } from 'mongoose';

// **** Run **** //

const SERVER_START_MSG =
  'Express server started on port: ' + EnvVars.Port.toString();

// Connecter à la base de données
connect(EnvVars.MongoDb_URI)
  .then(() => server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG)))
  .catch((err) => logger.err(err, true));

