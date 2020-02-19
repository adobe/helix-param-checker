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
/* global $http $util $secure */

const assert = require('assert');

$http.post({
    url: '$$$URL$$$',
    json: true,
  },
  // Callback
  function (err, response, body) {
    if (err) {
      $util.insights.set('error', err);
      console.error(err);
    }
    assert.equal(response.statusCode, 200, `Expected a 200 OK response, got: ${response.statusCode}`);
    assert.equal(body.hash, $secure.WSK_PARAM_HASH_HELIX, `SHA256 of parameters does not match, got: ${body.hash}`);
  }
);
