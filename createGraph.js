const graph = require('ngraph.graph')();
const domTree = require('./genDomTree.js');

function createGraph(domTree) {
    for (var i = 0; i < domTree.length; i++) {
        var node = domTree[i];
        var nodeName = node.name;
        var nodeAttributes = node.attributes;
        var nodeAttributeNames = nodeAttributes.name;
        var nodeAttributeValues = nodeAttributes.value;
        var nodeAttributeString = '';
        for (var j = 0; j < nodeAttributeNames.length; j++) {
            nodeAttributeString += nodeAttributeNames[j] + '="' + nodeAttributeValues[j] + '" ';
        }
        var nodeString = nodeName + ' ' + nodeAttributeString;
        graph.addNode(nodeString);
        if (i > 0) {
            var parentNode = domTree[i - 1];
            var parentNodeName = parentNode.name;
            var parentNodeAttributes = parentNode.attributes;
            var parentNodeAttributeNames = parentNodeAttributes.name;
            var parentNodeAttributeValues = parentNodeAttributes.value;
            var parentNodeAttributeString = '';
            for (var j = 0; j < parentNodeAttributeNames.length; j++) {
                parentNodeAttributeString += parentNodeAttributeNames[j] + '="' + parentNodeAttributeValues[j] + '" ';
            }
            var parentNodeString = parentNodeName + ' ' + parentNodeAttributeString;
            graph.addLink(nodeString, parentNodeString);
        }
    }
    return graph;
}

const domGraph = createGraph(domTree);
// domGraph.forEachNode(function(node){
//     console.log(node.id, node.data);
// });
// domGraph.forEachLink(function(link) {
//     console.dir(link);
// });