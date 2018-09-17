






<a href='https://rwserve.readwritetools.com'><img src='./img/rwserve.png' width=80 align=right /></a>

###### Lorem ipsum dolor sit amet

# RWSERVE Lorem Ipsum


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
platforms. Windows, MacOS and BSD are not supported.


<table>
	<tr><th>Software</th> <th>Minimum Version</th></tr>
	<tr><td>Ubuntu</td> <td>16</td></tr>
	<tr><td>Debian</td> <td>9</td></tr>
	<tr><td>Fedora</td> <td>27</td></tr>
	<tr><td>CentOS</td> <td>7.4</td></tr>
	<tr><td>RHEL</td> <td>8</td></tr>
	<tr><td>RWSERVE</td> <td>1.0</td></tr>
	<tr><td>Node.js</td> <td>10.3</td></tr>
</table>

## Review


<table>
	<tr><th>Lessons</th></tr>
	<tr><td>This plugin demonstrates a basic pattern that many plugins follow: <ul><li>Using default values provided in the configuration file.</li> <li>Honoring request values provided in query-string variables.</li> </ul> Find other plugins for the <code>Read Write Tools HTTP/2 Server</code> using <a href='https://www.npmjs.com/search?q=keywords:rwserve'>npm</a> with these keywords: <kbd>rwserve</kbd>, <kbd>http2</kbd>, <kbd>plugins</kbd>. </td></tr>
</table>

<p align=center><a href='https://readwritetools.com'><img src='./img/rwtools.png' width=80 /></a></p>
