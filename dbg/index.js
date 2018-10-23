//=============================================================================
//
// File:         rwserve-lorem-ipsum/src/index.js
// Language:     ECMAScript 2015
// Copyright:    Read Write Tools © 2018
// License:      MIT License
// Initial date: Sep 15, 2018
//
// Contents:     An RWSERVE plugin generate a payload with lorem-ipsum suitable for
//               use in testing scenarios where either a predictable or random payload is needed.
//
//======================== Sample configuration ===============================
/*
	plugins {
		rwserve-lorem-ipsum {
			location `/srv/rwserve-plugins/node_modules/rwserve-lorem-ipsum/dist/index.js`
			config {
				custom-text  Lorem ipsum dolor sit amet
				repeat       10
				randomize    false
				content-type text/plain
			}
		}
		router {
			`/lorem-ipsum`  *methods=GET,HEAD  *plugin=rwserve-lorem-ipsum
		}	
	}
*/
//=============================================================================

var log = require('rwserve-plugin-sdk').log;
var expect = require('rwserve-plugin-sdk').expect;
var SC = require('rwserve-plugin-sdk').SC;

module.exports = class RwserveLoremIpsum {

	constructor(hostConfig) {
		this.hostname      = hostConfig.hostname;
		this.pluginVersion = hostConfig.pluginsConfig.rwserveLoremIpsum.pluginVersion;		
		this.customText    = hostConfig.pluginsConfig.rwserveLoremIpsum.customText;
		this.repeat        = (hostConfig.pluginsConfig.rwserveLoremIpsum.repeat == undefined) ? '10' : hostConfig.pluginsConfig.rwserveLoremIpsum.repeat;
		this.randomize     = (hostConfig.pluginsConfig.rwserveLoremIpsum.randomize == undefined) ? 'false' : hostConfig.pluginsConfig.rwserveLoremIpsum.randomize;
		this.contentType   = hostConfig.pluginsConfig.rwserveLoremIpsum.contentType;
    	Object.seal(this);
	}
	
	async startup() {
		log.debug('RwserveLoremIpsum', `version ${this.pluginVersion}; © 2018 Read Write Tools; MIT License`); 
	}
	
	async shutdown() {
		log.debug('RwserveLoremIpsum', `Shutting down ${this.hostname}`); 
	}
	
	async processingSequence(workOrder) {
		
		var randomize = (workOrder.hasParameter('randomize')) ? workOrder.getParameter('randomize') : this.randomize;
		var repeat    = (workOrder.hasParameter('repeat'))    ? workOrder.getParameter('repeat')    : this.repeat;
		repeat = parseInt(repeat);
		if (isNaN(repeat))
			repeat = 10;
		
		try {			
			if (workOrder.hasParameter('custom-text')) 
				workOrder.setResponseBody(this.getCustomText(workOrder.getParameter('custom-text'), repeat, randomize));			

			else if (this.customText != undefined ) 
				workOrder.setResponseBody(this.getCustomText(this.customText, repeat, randomize));
			
			else
				workOrder.setResponseBody(this.getClassicText(repeat, randomize));
						
			// set the response 'content-type' only if specified through a query-string . . .
			if (workOrder.hasParameter('content-type'))
				workOrder.addStdHeader('content-type', workOrder.getParameter('content-type'));
			// . . . or in the configuration
			else if (this.contentType != undefined)
				workOrder.addStdHeader('content-type', this.contentType);
			
			workOrder.setStatusCode(SC.OK_200);			
		}
		catch (err) {
			log.error(err.message);
		}
	}
	
	getCustomText(customText, repeat, randomize) {
		expect(customText, 'String');
		expect(repeat, 'Number');
		expect(randomize, 'String');
		
		var output = [];
				
		if (randomize == 'true') {
			var words = customText.split(' ');			
			for (let i=0; i < repeat * words.length; i++) {
				var n = Math.floor(Math.random() * Math.floor(words.length));
				output.push(words[n]);
			}
		}
		else { // (this.randomize != 'true')
			for (let i=0; i < repeat; i++)
				output.push(customText);
		}
		return output.join(' ');
	}
	
	getClassicText(repeat, randomize) {				
		expect(repeat, 'Number');
		expect(randomize, 'String');

		var phrases = RwserveLoremIpsum.classicText();			
		var output = [];

		if (randomize == 'true') {
			for (let i=0; i < repeat; i++) {
				var n = Math.floor(Math.random() * Math.floor(phrases.length));
				output.push(phrases[n]);
			}
		}
		else { // (this.randomize != 'true')
			for (let i=0; i < repeat; i++)
				output.push(phrases[i % phrases.length]);
		}
		return output.join(' ');
	}
	
	static classicText() {
		var arr = [];
		arr.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
		arr.push('Nam fermentum gravida magna ut fermentum.');
		arr.push('Suspendisse eu nulla iaculis, egestas elit ultrices, volutpat quam.');
		arr.push('Fusce consequat felis eu ipsum finibus, id aliquam orci hendrerit.');
		arr.push('Maecenas mauris tellus, ultricies a interdum eget, molestie in erat.');
		arr.push('Suspendisse at mi sit amet dui porttitor eleifend.');
		arr.push('Donec eu tellus consectetur, varius nisl a, mollis sem.');
		arr.push('Vivamus at ornare nisl, nec lacinia mauris.');
		arr.push('Nunc sit amet varius mi, et tempus enim.');
		arr.push('Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.');
		arr.push('Phasellus at neque sapien.');
		arr.push('Integer neque nunc, varius sit amet pharetra in, ultricies quis ipsum.');
		arr.push('Nullam ultricies, elit id elementum ultrices, felis nisi lacinia elit, suscipit sollicitudin ex quam ut urna.');
		arr.push('Nullam ultrices, leo vitae lacinia sagittis, nunc lacus eleifend ex, vel luctus metus dui ac mauris.');
		arr.push('Mauris in leo elementum, ullamcorper leo vitae, mattis lectus.');
		arr.push('Nunc ultrices, orci vel sagittis finibus, odio mi mollis magna, non eleifend elit turpis a magna.');				
		arr.push('Nullam vel quam commodo lectus scelerisque pellentesque.');
		arr.push('Sed mi erat, pharetra vitae scelerisque ut, tristique non tellus.');
		arr.push('Maecenas quis mauris iaculis, tincidunt lectus eu, commodo orci.');
		arr.push('In non rutrum felis.');
		arr.push('Maecenas id elementum ante, sit amet cursus ipsum.');
		arr.push('Maecenas eleifend hendrerit porta.');
		arr.push('Praesent auctor elit quis semper tincidunt.'); 
		arr.push('Curabitur id posuere sapien.');
		arr.push('Phasellus sit amet massa libero.');
		arr.push('Suspendisse cursus in leo condimentum dapibus.'); 
		arr.push('Sed elementum tristique leo sed auctor.');
		arr.push('Nullam id iaculis odio.');
		arr.push('Ut ut commodo nibh.');
		arr.push('Suspendisse facilisis dictum enim quis mattis.');
		arr.push('Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.');
		arr.push('Duis sit amet molestie neque. Sed aliquam dignissim ex, non bibendum erat elementum quis.');
		arr.push('Integer non lacus metus.');
		arr.push('Aliquam mollis, orci vitae aliquam imperdiet, ex metus semper mi, ac volutpat lacus lectus et ante.');
		arr.push('Maecenas in mi nisi.');
		arr.push('Integer venenatis neque nec iaculis dapibus.');
		arr.push('Quisque justo ipsum, suscipit id cursus in, lacinia sed dolor.');
		arr.push('Sed ac arcu in risus convallis tincidunt.');
		arr.push('Morbi volutpat augue ut metus molestie molestie.'); 
		arr.push('Mauris nec sem in tortor fermentum semper.');
		arr.push('Integer ac mollis purus.');
		arr.push('Integer dictum nisl eget turpis tincidunt vehicula.');
		arr.push('Donec pharetra sagittis leo id rutrum.');
		arr.push('Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.');
		arr.push('Nullam turpis elit, vehicula eget pulvinar ut, volutpat in nibh.');
		arr.push('Praesent eget euismod magna.');
		arr.push('Nulla congue gravida libero.');
		arr.push('Curabitur odio nulla, tempus quis tincidunt eu, convallis nec est. Fusce suscipit nunc quam.');
		arr.push('Pellentesque sed felis sit amet neque egestas euismod.');
		arr.push('Aenean porttitor volutpat ipsum nec gravida.');
		arr.push('Morbi vehicula arcu pretium maximus maximus.');
		arr.push('Sed porttitor ornare libero.');
		arr.push('Nunc diam diam, auctor eget sollicitudin non, porttitor iaculis augue.');
		arr.push('Proin consectetur lacus sed velit vestibulum, vitae viverra mauris porta.'); 
		arr.push('Vivamus et erat vitae arcu ultricies auctor. Vestibulum a vestibulum velit, et egestas erat.');
		arr.push('Phasellus mattis vehicula erat, non pretium lectus dignissim at.');
		arr.push('Nunc ac nibh tristique, suscipit dui ut, vehicula nisi. Proin semper justo eget turpis laoreet accumsan.');
		arr.push('Vivamus vestibulum eu leo nec dignissim.');
		arr.push('Duis imperdiet nisl ligula.');
		arr.push('Aliquam et ligula id erat facilisis cursus.');
		arr.push('Vestibulum blandit interdum risus, ut interdum nunc cursus imperdiet.');
		arr.push('Mauris id molestie nulla, a consequat nisi.');
		arr.push('Proin convallis nulla et tortor pulvinar elementum.');
		arr.push('Nulla ut tempus augue. Nunc mattis fringilla mi, quis varius elit imperdiet sit amet.');
		arr.push('Sed ornare, purus ultrices egestas semper, ligula lorem placerat erat, scelerisque tempus felis nisi ac nisi.');
		arr.push('In eget lectus metus. Etiam sed eros lectus.');
		arr.push('Nam consequat rutrum porta.');
		arr.push('Fusce molestie, libero dictum dignissim pulvinar, enim eros convallis eros, ultricies ornare ipsum nibh nec turpis.');
		arr.push('Curabitur rhoncus dui sit amet quam suscipit, vel bibendum mauris efficitur.');
		arr.push('Vivamus velit ex, faucibus in dignissim ultricies, rutrum sit amet magna.');
		return arr;
	}
}
