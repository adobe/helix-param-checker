/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-env mocha */

'use strict';

const assert = require('assert');
const crypto = require('crypto');

const action = require('../src/index.js');

describe('Hash Tests', () => {
  it('Assert hash returns the same value', async () => {
    const params = {
      B: '2', c: '3', A: 1,
    };
    const hash = crypto.createHash('sha256')
      .update(JSON.stringify({ A: 1, B: '2' }))
      .digest('hex');
    const response = await action.main(params);
    assert.equal(response.body.hash, hash);
  });
});
