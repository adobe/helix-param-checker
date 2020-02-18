/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

'use strict';

const crypto = require('crypto');
const { logger } = require('@adobe/openwhisk-action-logger');
const { wrap } = require('@adobe/openwhisk-action-utils');
const statusWrap = require('@adobe/helix-status').wrap;

/**
 * Runtime action.
 *
 * @param {Object} params parameters
 */
async function run(params) {
  const uppercaseParams = Object.keys(params)
    .sort()
    .filter((name) => name.match(/[A-Z][A-Z0-9-_]*/))
    .reduce((obj, name) => {
      // eslint-disable-next-line no-param-reassign
      obj[name] = params[name];
      return obj;
    }, {});
  const hash = crypto.createHash('sha256')
    .update(JSON.stringify(uppercaseParams))
    .digest('hex');

  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 200,
    body: {
      hash,
    },
  };
}

module.exports.main = wrap(run)
  .with(logger)
  .with(statusWrap);
