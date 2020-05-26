







<figure>
	<img src='/img/plugins/lorem-ipsum/lorem-ipsum-pixaby-krzysztof-pluta.jpg' width='100%' />
	<figcaption></figcaption>
</figure>

# Lorem Ipsum

## Dolor sit amet


<address>
<img src='/img/rwtools.png' width=80 /> by <a href='https://readwritetools.com' title='Read Write Tools'>Read Write Tools</a> <time datetime=2018-10-22>Oct 22, 2018</time></address>



<table>
	<tr><th>Abstract</th></tr>
	<tr><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum gravida magna ut fermentum. Suspendisse eu nulla iaculis, egestas elit ultrices, volutpat quam. Fusce consequat felis eu ipsum finibus, id aliquam orci hendrerit.</td></tr>
</table>

### Motivation

When developing a new plugin it's necessary to test the working functionality
with payloads of various sizes. The data in the payload itself has no particular
meaning, only it's presence or absence.

Sometimes these tests work best when the payload is deterministic: where the
data and its length are repeatable. Other tests work better when the payload is
random in length and value.

This plugin generates a response body either deterministically or randomly based
on settings provided in the configuration file, or through query-string
variables.

#### Customization

Classic *Lorem Ipsum* is the default text for the payload, but custom text can be
specified when necessary.

This plugin is open source and can be used as is, or enhanced to provide
additional features, such as:

   * Obtaining custom text from data sources on the server.
   * Generating payloads in additional languages. (See ISO-639-3 for "tlh").

### Download

The plugin module is available from <a href='https://www.npmjs.com/package/rwserve-lorem-ipsum'>NPM</a>
. Before proceeding, you should already have `Node.js` and `RWSERVE` configured and
tested.

This module should be installed on your web server in a well-defined place, so
that it can be discovered by `RWSERVE`. The standard place for public domain
plugins is `/srv/rwserve-plugins`.

<pre>
cd /srv/rwserve-plugins
npm install rwserve-lorem-ipsum
</pre>

### Configuration is Everything

Make the software available by declaring it in the `plugins` section of your
configuration file. For detailed instructions on how to do this, refer to the <a href='https://rwserve.readwritetools.com/plugins.blue'>plugins</a>
documentation on the `Read Write Tools HTTP/2 Server` website.

#### TL;DR

<pre>
plugins {
    rwserve-lorem-ipsum {
        location `/srv/rwserve-plugins/node_modules/rwserve-lorem-ipsum/dist/index.js`
        config {
            custom-text  Bacon ipsum dolor amet tail ribeye pork loin leberkas ham hock cupim buffalo sirloin
            repeat       10
            randomize    false
            content-type text/plain
        }
    }
    router {
        `/lorem-ipsum*`  *methods=GET,HEAD  *plugin=rwserve-lorem-ipsum
    }    
}
</pre>

The `config` settings are straightforward:

   * `custom-text` is the Lorem Ipsum to use in the payload.
   * `repeat` is the number of times the text should be repeated.
   * `randomize` is "true" or "false".
   * `content-type` is the MIME-type identifier to add to the response headers.

When `randomize` is "false" the same payload is generated each time.

When `custom-text` is omitted, and randomize is "true" the payload will consist of
an arbitrary selection of classic "sentences".

When `custom-text` is provided, and randomize is "true" the text is split into
words and rearranged to provide an arbitrary selection of words.

When `content-type` is omitted, no "content-type" header is added to the response.

The sample `router` shown above will route any `GET` or `HEAD` request for the virtual
resource ```/lorem-ipsum```, to the plugin.

#### Cookbook

A full configuration file with typical settings for a server running on
localhost port 7443, is included in this NPM module at `etc/lorem-ipsum-config`.
To use this configuration file, adjust these variables if they don't match your
server setup:

<pre>
$PLUGIN-PATH='/srv/rwserve-plugins/node_modules/rwserve-lorem-ipsum/dist/index.js'
$PRIVATE-KEY='/etc/pki/tls/private/localhost.key'
$CERTIFICATE='/etc/pki/tls/certs/localhost.crt'
$DOCUMENTS-PATH='/srv/rwserve/configuration-docs'
</pre>

#### Runtime overrides

Sometimes it is desirable to override the settings provided in the configuration
file on a request-by-request basis. This can be done by providing the values as
query string variables. To do this, use the identical names as above, being sure
to urlencode the custom text. For example:

<pre>
https://localhost:7443/lorem-ipsum?repeat=1000&randomize=true&content-type=text%2Fplain&custom-text=Bacon%20ipsum%20dolor%20amet%20tail%20ribeye%20pork%20loin%20leberkas%20ham%20hock%20cupim%20buffalo%20sirloin
</pre>

#### Deployment

Once you've tested the plugin and are ready to go live, adjust your production
web server's configuration in `/etc/rwserve/rwserve.conf` and restart it using `systemd`
. . .

<pre>
[user@host ~]# systemctl restart rwserve
</pre>

. . . then monitor its request/response activity with `journald`.

<pre>
[user@host ~]# journalctl -u rwserve -ef
</pre>

### Prerequisites

This is a plugin for the **Read Write Tools HTTP/2 Server**, which works on Linux
platforms.


<table>
	<tr><th>Software</th> <th>Minimum Version</th> <th>Most Recent Version</th></tr>
	<tr><td>Ubuntu</td> 		<td>16 Xenial Xerus</td> <td>16 Xenial Xerus</td></tr>
	<tr><td>Debian</td> 		<td>9 Stretch</td> 		<td>10 Buster</td></tr>
	<tr><td>openSUSE</td>	<td>openSUSE 15.1</td> 	<td>openSUSE 15.1</td></tr>
	<tr><td>Fedora</td> 		<td>Fedora 27</td> 		<td>Fedora 32</td></tr>
	<tr><td>CentOS</td>		<td>CentOS 7.4</td>		<td>CentOS 8.1</td></tr>
	<tr><td>RHEL</td> 		<td>RHEL 7.8</td>		<td>RHEL 8.2</td></tr>
	<tr><td>RWSERVE</td>		<td>RWSERVE 1.0.1</td>	<td>RWSERVE 1.0.47</td></tr>
	<tr><td>Node.js</td>		<td>Node.js 10.3</td>	<td>Node.js 12.17</td></tr>
</table>

### Review


<table>
	<tr><th>Lessons</th></tr>
	<tr><td>This plugin demonstrates a basic pattern that many plugins follow: <ul><li>Using default values provided in the configuration file.</li> <li>Honoring request values provided in query-string variables.</li> </ul> Find other plugins for the <code>Read Write Tools HTTP/2 Server</code> using <a href='https://www.npmjs.com/search?q=keywords:rwserve'>npm</a> with these keywords: <kbd>rwserve</kbd>, <kbd>http2</kbd>, <kbd>plugins</kbd>. </td></tr>
</table>

### License

The <span>rwserve-lorem-ipsum</span> plugin is licensed under the
MIT License.

<img src='/img/blue-seal-mit.png' width=80 align=right />

<details>
	<summary>MIT License</summary>
	<p>Copyright © 2020 Read Write Tools.</p>
	<p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
	<p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
	<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
</details>

### Availability


<table>
	<tr><td>Source code</td> 			<td><a href='https://github.com/readwritetools/rwserve-lorem-ipsum'>github</a></td></tr>
	<tr><td>Package installation</td> <td><a href='https://www.npmjs.com/package/rwserve-lorem-ipsum'>NPM</a></td></tr>
	<tr><td>Documentation</td> 		<td><a href='https://hub.readwritetools.com/plugins/lorem-ipsum.blue'>Read Write Hub</a></td></tr>
</table>

