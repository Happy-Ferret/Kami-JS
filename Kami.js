var union = function(s1,s2){//union of two sets view as lists
	if(!fullListCheck(s1)) return s2.concat();
	if(!fullListCheck(s2)) return s1.concat();
	var obj1={};
	for(var i=0;i<s1.length;i++)
		obj1[s1[i]]=1;
	for(var i=0;i<s2.length;i++)
		obj1[s2[i]]=1;
	return Object.keys(obj1);
};
var multiUnion = function(s_l){//union over multi sets
	if(s_l.length<2)
		return s_l[0];
	var obj1={};
	for(var i=0;i<s_l.length;i++){
		for(var j=0;j<s_l[i].length;j++)
			obj1[s_l[i][j]]=1;
	}
	return Object.keys(obj1);
};
var intersection = function(s1,s2){//intersection of two sets see as lists
	var obj1={};
	for(var i=0;i<s1.length;i++)
		obj1[s1[i]]=0;
	for(var i=0;i<s2.length;i++){
		if(typeof obj1[s2[i]]!='undefined' && obj1[s2[i]]==0)
			obj1[s2[i]]=1;
	}
	var keys=Object.keys(obj1);
	var ret=[];
	for(var i=0;i<keys.length;i++){
		if(obj1[keys[i]]==1)
			ret.push(keys[i]);
	}
	return ret;
};
var multiIntersection = function(s_l){//intersection over multi sets
	if(s_l.length<2)
		return s_l[0];
	else if(s_l.length==2)
		return intersection(s_l[0],s_l[1]);
	else{
		var s1=s_l.shift();
		var s2=s_l.shift();
		var inter=intersection(s1,s2);
		s_l.push(inter);
		return multiIntersection(s_l);
	}
};
var rmElements = function(s1,s2){//remove all element from the intersection of s2/s1 in s1
	var obj_1={};
	for(var i=0;i<s1.length;i++)
		obj_1[s1[i]]=1;
	for(var i=0;i<s2.length;i++){
		if(typeof obj_1[s2[i]] != 'undefined')
		obj_1[s2[i]]=0;
	}
	var obj_k=Object.keys(obj_1);
	var ret=[];
	for(var i=0;i<obj_k.length;i++){
		if(obj_1[obj_k[i]]==1)
			ret.push(obj_k[i]);
	}
	return ret;
};
var fullListCheck = function(l){//verify if a list is defined and not empty
	return typeof l!='undefined' && l!=null && l.length>0;
};
var idV = function(id){//get the numerical value of an id
	return parseInt(id.split('_')[1]);
}
var idT = function(id){//get the header of an id
	return id.split('_')[0];
}
function Node(i,t,n,l,v,u){
	var id=i;//unique identifier of a node
	if(typeof t=='undefined' || t==null || t.length==0)
		throw "unknown type :"+t;
	var type=t;//this node type : component(1)/action(2)/super(3)/attribute (1):agent/region/keyres/flag (2):modPos/modNeg/syn/deg/bnd/brk/input/output (3):family/set/process
	var labels=l || [];
	var values=v || [];
	var uid=u || null;
	var father=null;
	var nuggets=n || [];
	var sons=[];
	this.getId = function getId(){
		return id;
	};
	this.getType = function getType(){
		return type.concat();
	}
	this.getLabels = function getLabels(){
		return labels.concat();
	};
	this.getValues = function getValues(){
		return values.concat();
	};
	this.getUid = function getUid(){
		return uid;
	};
	this.getFather = function getFather(){
		return father;
	};
	this.getNugget = function getNugget(){
		return nuggets.concat();
	};
	this.getSons = function getSons(){
		return sons.concat();
	};
	this.addLabels = function addLabels(l){
		labels=union(labels,l);
	};
	this.rmLabels = function rmLabels(l){
		labels=rmElements(labels,l);
	};
	this.deleteLabels = function deleteLabels(){
		labels=[];
	};
	this.addValues = function addValues(v){
		values=union(values,v);
	};
	this.rmValues = function rmValues(v){
		values=rmElements(values,v);
	};
	this.deleteValues = function deleteValues(){
		values=[];
	};
	this.setUid = function setUid(u){
		uid=u;
	};
	this.setFather = function setFather(f){
		father=f;
	};
	this.addNugget = function addNugget(n){
		nuggets=union(nuggets,n);
	};
	this.rmNugget = function rmNugget(n){
		nuggets=rmElements(nuggets,n);
	};
	this.deleteNugget = function deleteNugget(){
		nuggets=[];
	};
	this.addSons = function addSons(s_l){
		sons=union(sons,s_l);
	};
	this.rmSons = function rmSons(s_l){
		sons=rmElements(sons,s_l);
	};
	this.deleteSons = function deleteSons(){
		sons=[];
	};
	this.hasType = function hasType(t){
		return type.indexOf(t)!=-1;
	};
	this.hasLabel = function hasLabel(l){
		return labels.indexOf(l)!=-1;
	};
	this.hasValue =function hasValue(v){
		return values.indexOf(v)!=-1;
	};
	this.hasNugget = function hasNugget(n){
		return nuggets.indexOf(n)!=-1;
	};
	this.hasSons = function hasSons(s){
		return sons.indexOf(s)!=-1;
	};
	this.log = function log(){
		console.log('==== ' + id + ' ====');
		console.log('type : '+type);
		console.log('nugget : '+nuggets);
		console.log('uid : '+uid);
		console.log('labels : '+labels);
		console.log('values : '+values);
		console.log('father : '+father);
		console.log('sons : '+sons);
		console.log('______________')
	};
	this.clone = function clone(){
		return new Node(id,type.concat(),nuggets.concat(),labels.concat(),values.concat(),uid);
	};
}
function Edge(ii,t,n,i,o){
	var id=ii;
	if(typeof t=='undefined' || t==null || t.length==0)
		throw "unknown type :"+t;
	var type=t;//type can be 'link','parent','posinfl','neginfl','rw_rule'
	var source=i;//for parenting : source is the son
	var target=o;
	var nuggets=n || [];
	this.getId = function getId(){
		return id;
	};
	this.getNugget = function getNugget(){
		return nuggets.concat();
	};
	this.getType = function getType(){
		return type.concat();
	};
	this.getSource = function getSource(){
		return source;
	};
	this.getTarget = function getTarget(){
		return target;
	};
	this.setSource = function setSource(i) {
		source=i;
	};
	this.setTarget = function setTarget(o){
		target=o;
	};
	this.addNugget = function addNugget(n){
		nuggets=union(nuggets,n);
	};
	this.rmNugget = function rmNugget(n){
		nuggets=rmElements(nuggets,n);
	};
	this.deleteNugget = function deleteNugget(){
		nuggets=[];
	};
	this.hasNugget = function hasNugget(n){
		return nuggets.indexOf(n)!=-1;
	};
	this.log = function log(){
		console.log('==== ' + id + ' ====');
		console.log('type : '+type);
		console.log('nugget : '+nuggets);
		console.log('source : '+source);
		console.log('target : '+target);
		console.log('______________');
	};
	this.clone = function clone(){
		return new Edge(id,type,nuggets.concat(),source,target);
	}
}
function UndoRedoStack(){//generic implementation of undo redo as graph rw rules
    var undo_stack =[];//a stack of undo
    var redo_stack =[];//a stack of redo
    var sub_stack = {};//list of nuggets stacks and position {stack:list,pos:int}
    this.stack = function stack(el){//el is a delta object and its position : {ng:nugget id,left{nodes:[node list],edges:[edges list]},right{nodes:[nodes list],edges:[edges list]}}
        if(el==null){
            console.log("stacking empty element : do nothing");
            return;
        }
        if(typeof sub_stack[el.ng]=='undefined' || sub_stack[el.ng]==null)//if this nugget have no stack, create one
            sub_stack[el.ng]={"idx":-1,"stack":[]};
        if(sub_stack[el.ng].idx<sub_stack[el.ng].stack.length-1){//if we add an element in the middle of the stack, redo are lost
            var removed=sub_stack[el.ng].stack.length-1-sub_stack[el.ng].idx;
            sub_stack[el.ng].stack.splice(sub_stack[el.ng].idx+1);
            for(var i=redo_stack.length-1,j=1;i>=0 && j<=removed;i--){
                if(redo_stack[i].ng==el.ng && redo_stack[i].idx==sub_stack[el.ng].idx+j){
                    redo_stack.splice(i,1);
                    j++;
                }
            }
        }
        sub_stack[el.ng].stack.push(el);//add the new item
        sub_stack[el.ng].idx=sub_stack[el.ng].stack.length-1;//update index
        undo_stack.push({'ng':el.ng,'idx':sub_stack[el.ng].idx});//update global index
    };
    this.undo = function undo(){
        return this.localUndo(undo_stack[undo_stack.length-1].ng);
    };
    this.redo = function redo(){
        return this.localRedo(redo_stack[redo_stack.length-1].ng);
    };
    this.localUndo = function localUndo(s_id){
        if(typeof sub_stack[s_id]=='undefined' || sub_stack[s_id]==null || sub_stack[s_id].stack.length==0 || sub_stack[s_id].idx==-1)
            return null;
        for(var i=undo_stack.length-1;i>=0;i--){
            if(undo_stack[i].ng==s_id && undo_stack[i].idx==sub_stack[s_id].idx){
                var remove=undo_stack.splice(i,1);
                redo_stack.push(remove[0]);
                break;
            }
        }
        return sub_stack[s_id].stack[sub_stack[s_id].idx--];
    };
    this.localRedo = function localRedo(s_id){
        if(typeof sub_stack[s_id]=='undefined' || sub_stack[s_id]==null || sub_stack[s_id].stack.length==0 || sub_stack[s_id].idx==sub_stack[s_id].stack.length-1) {
            return null;
        }
        for(var i=redo_stack.length-1;i>=0;i--){
            if(redo_stack[i].ng==s_id && redo_stack[i].idx==sub_stack[s_id].idx+1){
                var remove=redo_stack.splice(i,1);
                undo_stack.push(remove[0]);
                break;
            }
        }
        var ret=sub_stack[s_id].stack[++sub_stack[s_id].idx];
        console.log(ret);
        return ret;
    };
    this.clear = function clear(){
        undo_stack =[];
        redo_stack =[];
        sub_stack = {};
    };
    this.clearLocal = function clearLocal(s_id){
        for(var i=redo_stack.length-1;i>=0;i--){
            if(redo_stack[i].ng==s_id){
                redo_stack.splice(i,1);
            }
        }
        for(var i=undo_stack.length-1;i>=0;i--){
            if(undo_stack[i].ng==s_id){
                undo_stack.splice(i,1);
            }
        }
        sub_stack[s_id]=null;
    };
    this.log = function log(){
        console.log("==== undoRedo logs: ====");
        console.log("undo stack");
        console.log(undo_stack);
        console.log("redo stack");
        console.log(redo_stack);
        console.log("local stack");
        console.log(sub_stack);
    }
}
function LayerGraph(){//An autonomous multi layer graph with optimized modification actions (all in O(1)) except removal/merge in O(Max(node arity)) and undo redo stack
	var NODE_ID = 0;//unique id for nodes (actions/components)
	var EDGE_ID = 0;//unique id for edges (linking edges and structure edges)
	var nodes = {};//hashtable of nodes objects, key:id, value:node
	var edges = {};//hashtable of edges objects, key:id, value:edge
	var nodesByLabel = {};//hashtable of nodes, key:label, value :nodes id list
	var nodesByUid = {};//hashtable of nodes, key:uid, value: nodes id list
	var nodesByNuggets = {};//hashtable of nodes, key: nugget id, value:nodes id list
	var edgesByNuggets = {};//hashtable of edges, key: nugget id, value:edges id list
	var edgesBySource={};//hashtable of edges, key:node input id, values: edges id list
	var edgesByTarget={};//hashtable of edges, key:node output id, values:edges id list
	var undoRedo=new UndoRedoStack();//undo redo stack for this layer graph.
	var getNode = function(id){//return a specific node for a specific id
		return nodes[id];
	};
	this.getNodes = function getNodes(){//return the whole nodes as a list of id
		return Object.keys(nodes);
	};
	var getEdge = function(id){//return a specific edge for an id
		return edges[id];
	};
	this.getEdges = function getEdges(){//return the whole edges as a list of id
		return Object.keys(edges);
	};
	var putNode = function(n){//UNSAFE add a node to the LG, be carefull, this node must have a none existing ID !
		nodes[n.getId()]=n;
		var tmp_lb=n.getLabels();//add this node to the label hashtable
		for(var i=0;i<tmp_lb.length;i++){
			if(fullListCheck(nodesByLabel[tmp_lb[i]]))
				nodesByLabel[tmp_lb[i]].push(n.getId());
			else nodesByLabel[tmp_lb[i]]=[n.getId()];
		}
		var tmp_lb=n.getUid();//add the node to the Uid hashtable
		if(tmp_lb!=null){
			if(fullListCheck(nodesByUid[tmp_lb]))
				nodesByUid[tmp_lb].push(n.getId());
			else nodesByUid[tmp_lb]=[n.getId()];
		}
		var tmp_lb=n.getNugget();//add the node to the Nuggets hashtable
		for(var i=0;i<tmp_lb.length;i++){
			if(fullListCheck(nodesByNuggets[tmp_lb[i]]))
				nodesByNuggets[tmp_lb[i]].push(n.getId());
			else nodesByNuggets[tmp_lb[i]]=[n.getId()];
		}
		return {'ng':n.getNugget()[0],'left':null,'right':{'nodes':[n.clone()],'edges':[]}};
	};
	this.addNode = function addNode(t,ng,l,v,u){//add a NEW node
		var n=new Node('n_'+NODE_ID++,t,ng,l,v,u);
		undoRedo.stack(putNode(n));
	};
	var clNode = function(id){
        var n=nodes[id];
		var ret={'ng':n.getNugget()[0],'right':null,'left':{'nodes':[n.clone()],'edges':[]}};//add this node to the delta
		var source_edges = edgesBySource[id];//get all edges going from this node
		if(fullListCheck(source_edges)){//remove all edges going from this node
			for(var i=0;i<source_edges.length;i++){
				ret.left.edges.push(clEdge(source_edges[i]).left.edges[0]);
			}
		}
		delete edgesBySource[id];//remove information from hashtable

		var target_edges = edgesByTarget[id];//get all edges going to this node
		if(fullListCheck(target_edges)){//remove all edges going to this node
			for(var i=0;i<target_edges.length;i++)
				ret.left.edges.push(clEdge(target_edges[i]).left.edges[0]);
		}
		delete edgesByTarget[id];//remove information from hashtable
		var tmp_lb=nodes[id].getLabels();//remove this node from the label hashtable
		for(var i=0;i<tmp_lb.length;i++){
			nodesByLabel[tmp_lb[i]].splice(nodesByLabel[tmp_lb[i]].indexOf(id),1);
		}
		var tmp_ui=n.getUid();//remove the node from the Uid hashtable
        if(typeof tmp_ui!='undefined' && tmp_ui!=null)
		    nodesByUid[tmp_ui].splice(nodesByUid[tmp_ui].indexOf(id),1);
		var tmp_ng=n.getNugget();//remove the node from the Nuggets hashtable
		for(var i=0;i<tmp_ng.length;i++)
			nodesByNuggets[tmp_ng[i]].splice(nodesByNuggets[tmp_ng[i]].indexOf(id),1);
		delete nodes[id];//remove the node object
		return ret;
	};
	this.rmNode = function rmNode(id){//remove a specific node
		undoRedo.stack(clNode(id));//return Delta
	};
	this.mergeNode = function mergeNode(id1,id2){//merge two node in a third one.
		if(nodes[id1].getNugget()[0]!=nodes[id2].getNugget()[0])
			throw "We can't merge nodes of different clusters!";
		if(nodes[id1].getUid()!=nodes[id2].getUid() && idT(nodes[id1].getUid())=="up" && idT(nodes[id2].getUid())=="up")
			throw "We can't merge nodes of different uniprot ID !"
		var uid=nodes[id1].getUid();//by default the new uid is the first node uid or Upid
		if(idT(nodes[id2].getUid())=="up")
			uid=nodes[id2].getUid();//if id2 has an uniprot id, we prefere it to the basic uid of id1 (or id1 has the same Upid)
		var delta={'ng':nodes[id1].getNugget()[0],'right':{'nodes':[],'edges':[]},'left':{'nodes':[],'edges':[]}};
		var added_node=putNode(new Node(
                                'n_'+NODE_ID++,
                                union(nodes[id1].getType(),nodes[id2].getType()),
                                nodes[id1].getNugget(),
                                union(nodes[id1].getLabels(),nodes[id2].getLabels()),
                                union(nodes[id1].getValues(),nodes[id2].getValues()),
                                uid
        ));//add the resulting node
		delta.right.nodes=added_node.right.nodes.concat();
		var source_edges=union(edgesBySource[id1],edgesBySource[id2]);//get all the edges from id1 or id2
		var target_edges=rmElements(union(edgesByTarget[id1],edgesByTarget[id2]),source_edges);//get all the edges to id1 or id2, less the edges already in source !
		var edges_delta=[];
		for(var i=0;i<source_edges.length;i++) {
            edges_delta.push(putEdge(new Edge(
                                        'e_'+EDGE_ID++,
                                        edges[source_edges[i]].getType(),
                                        edges[source_edges[i]].getNugget(),
                                        delta.right.nodes[0].getId(),
                                        edges[source_edges[i]].getTarget()
            )));//add a new edge from the merge node to the old target
        }
        for(var i=0;i<target_edges.length;i++) {
            edges_delta.push(putEdge(new Edge(
                                        'e_'+EDGE_ID++,
                                        edges[source_edges[i]].getType(),
                                        edges[source_edges[i]].getNugget(),
                                        edges[source_edges[i]].getSource(),
                                        delta.right.nodes[0].getId()
            )));//add a new edge from the merge node to the old target
        }
        for(var i=0;i<edges_delta.length;i++)
			delta.right.edges.push(edges_delta[i].right.edges[0]);//add all the created edges to the delta
		var n1_rm = this.clNode(id1);
		var n2_rm = this.clNode(id2);
		delta.left.nodes=n1_rm.left.nodes.concat(n2_rm.left.nodes);//add old node to delta.
		delta.left.edges=n1_rm.left.edges.concat(n2_rm.left.edges);//add old edges to delta.
		undoRedo.stack(delta);
	}
	this.addNodeLabels = function addNodeLabels(id,l){//add some labels to a node
		var ret={'ng':nodes[id].getNugget()[0],'left':{'nodes':[nodes[id].clone()],'edges':[]},'right':{'nodes':[],'edges':[]}};
		nodes[id].addLabels(l);
		for(var i=0;i<l.length;i++){//add the node id to the nodebylabel hashtable
			if(!fullListCheck(nodesByLabel[l[i]]))
				nodesByLabel[l[i]]=[];
			nodesByLabel[l[i]].push(id);
		}
		ret.right.nodes.push(nodes[id].clone());
		undoRedo.stack(ret);
	};
	this.rmNodeLabels = function rmNodeLabels(id,l){//remove labels from a node if l is null or [], remove all the labels
		var ret={'ng':nodes[id].getNugget()[0],'left':{'nodes':[nodes[id].clone()],'edges':[]},'right':{'nodes':[],'edges':[]}};
		if(fullListCheck(l)){//remove the node id from the node by labels hashtable
			for(var i=0;i<l.length;i++)
				nodesByLabel[l[i]].splice(nodesByLabel[l[i]].indexOf(id),1);	
		}else{
			var lb=nodes[id].getLabels();
			for(var i=0;i<lb.length;i++)
				nodesByLabel[lb[i]].splice(nodesByLabel[lb[i]].indexOf(id),1);	
		}
		if(fullListCheck(l))//rm the node labels
			nodes[id].rmLabels(l);
		else nodes[id].deleteLabels();
		ret.right.nodes.push(nodes[id].clone());
		undoRedo.stack(ret);
	};
	this.chNodeUid = function chNodeUid(id,uid){//change Node Uid
		var ret={'ng':nodes[id].getNugget()[0],'left':{'nodes':[nodes[id].clone()],'edges':[]},'right':{'nodes':[],'edges':[]}};
		nodesByUid[id.getUid()].splice(nodesByUid[id.getUid()].indexOf(id),1);//remove the node id from its all uid hashtable
		nodes[id].setUid(uid);//change node uid
		if(uid!=null){
			if(!fullListCheck(nodesByUid[uid]))//add the node id to its new uid hashtable
				nodesByUid[uid]=[];
			nodesByUid[uid].push(id);
		}
		ret.right.nodes.push(nodes[id].clone());
		undoRedo.stack(ret);
	};
	this.addNodeValues = function addNodeValues(id,l){//add some values to a node
		var ret={'ng':nodes[id].getNugget()[0],'left':{'nodes':[nodes[id].clone()],'edges':[]},'right':{'nodes':[],'edges':[]}};
		nodes[id].addValues(l);
		ret.right.nodes.push(nodes[id].clone());
		undoRedo.stack(ret);
	};
	this.rmNodeValues = function rmNodeValues(id,l){//remove values from a node if l is null or [], remove all the Values
		var ret={'ng':nodes[id].getNugget()[0],'left':{'nodes':[nodes[id].clone()],'edges':[]},'right':{'nodes':[],'edges':[]}};
		if(fullListCheck(l))
			nodes[id].rmValues(l);
		else nodes[id].deleteValues();
		ret.right.nodes.push(nodes[id].clone());
		undoRedo.stack(ret);
	};
	var putEdge = function(e){//UNSAFE add an edge to the LG, be carefull, this edge must have a none existing ID !
		edges[e.getId()]=e;
        e.log();
		if(e.getType()=='parent'){//if parenting, add information in the corresponding node
			nodes[e.getSource()].setFather(e.getTarget());
			nodes[e.getTarget()].addSons([e.getSource()]);
		}
		if(!fullListCheck(edgesBySource[e.getSource()])) edgesBySource[e.getSource()]=[];//add the edge to edgesBySource hashtable
		edgesBySource[e.getSource()].push(e.getId());
		if(!fullListCheck(edgesByTarget[e.getTarget()])) edgesByTarget[e.getTarget()]=[];//add the edge to edgesByTarget hashtable
		edgesByTarget[e.getTarget()].push(e.getId());
		if(!fullListCheck(edgesByNuggets[e.getNugget()])) edgesByNuggets[e.getNugget()]=[];//add the edge to edgesByNuggets hashtable
		edgesByNuggets[e.getNugget()].push(e.getId());
		return {'ng':e.getNugget()[0],'left':null,'right':{'nodes':[],'edges':[e.clone()]}};
	};
	this.addEdge = function addEdge(t,ng,i,o){//add a NEW edge 
		var e=new Edge('e_'+EDGE_ID++,t,ng,i,o);
		undoRedo.stack(putEdge(e));
	};
	var clEdge = function(id){
        var e=edges[id];
		if(typeof e=='undefined' || e==null){
			console.log("unExisting edge "+id);
			return null;
		}
		var ret={'ng':e.getNugget()[0],'left':{'nodes':[],'edges':[e.clone()]},'right':null};
		edgesBySource[e.getSource()].splice(edgesBySource[e.getSource()].indexOf(id),1);//remove the edge from its source hashtable
		edgesByTarget[e.getTarget()].splice(edgesByTarget[e.getTarget()].indexOf(id),1);//remove the edge from its target hashtable
		edgesByNuggets[e.getNugget()].splice(edgesByNuggets[e.getNugget()].indexOf(id),1);//remove the edge from its nugget hashtable
		delete edges[id];//remove the edge object
		if(e.getType()=='parent'){//remove parenting information if needed
			nodes[e.getSource()].setFather(null);
			nodes[e.getTarget()].rmSons([e.getSource()]);
		}
		return ret;
	};
	this.rmEdge = function rmEdge(id){//remove an edge
		undoRedo.stack(clEdge(id));
	};
	this.getNodeByLabels = function getNodeByLabels(labels){//return a nodes id list corresponding to the specific labels
		var nodes_lists =[];
		for(var i=0;i<labels.length;i++)
			nodes_lists.push(nodesByLabel[labels[i]]);
		return multiIntersection(nodes_lists);
	};
	this.getNodeByUid = function getNodeByUid(uid){//return the node id corresponding to a specific uid
		return nodesByUid[uid].concat();
	};
	this.getNodeByNugget = function getNodeByNugget(n_id){//return all nodes in a specific nugget
		return nodesByNuggets[n_id].concat();
	}
	this.getEdgeBySource = function getEdgeBySource(iid){//return all the edges corresponding to a specific input (id list)
		return edgesBySource[iid].concat();
	};
	this.getEdgeByTarget = function getEdgeByTarget(oid){//return all the edges corresponding to a specific output (id list)
		return edgesByTarget[oid].concat();
	};
	this.getEdgeByNugget = function getEdgeByNugget(n_id){//return all edges in a specific nugget
		return edgesByNuggets[n_id].concat();
	};
	this.log = function log() {
		var n_keys = Object.keys(nodes);
		var e_keys = Object.keys(edges);
		console.log("NODES : ===================>");
		for (var i = 0; i < n_keys.length; i++)
			nodes[n_keys[i]].log();
		console.log("EDGES : ===================>");
		for (var i = 0; i < e_keys.length; i++)
			edges[e_keys[i]].log();
		console.log("nodesByLabel : ===================>");
		console.log(nodesByLabel);
		console.log("nodesByUid : ===================>");
		console.log(nodesByUid);
		console.log("nodesByNuggets : ===================>");
		console.log(nodesByNuggets);
		console.log("edgesByNuggets : ===================>");
		console.log(edgesByNuggets);
		console.log("edgesBySource : ===================>");
		console.log(edgesBySource);
		console.log("edgesByTarget : ===================>");
		console.log(edgesByTarget);
	};
	this.logStack = function logStack(){
		undoRedo.log();
	};
	this.undo = function undo(){
		deltaLeft(undoRedo.undo());
	};
	this.redo = function redo(){
		deltaRight(undoRedo.redo());
	};
	this.localUndo = function localUndo(s_id){
		deltaLeft(undoRedo.localUndo(s_id));
	};
	this.localRedo = function localRedo(s_id){
		deltaRight(undoRedo.localRedo(s_id));
	};
	this.stackClear = function stackClear(){
		undoRedo.clear();
	};
	this.stackLocClear = function stackLocClear(s_id){
		undoRedo.clearLocal(s_id);
	};
	this.undoNugget = function undoNugget(s_id){
		var delta=undoRedo.localUndo(s_id);
		while(delta!=null){
			deltaLeft(delta);
			delta=undoRedo.localUndo(s_id);
		}
	};
	this.redoNugget = function redoNugget(s_id){
		var delta=undoRedo.localRedo(s_id);
		while(delta!=null){
			deltaRight(delta);
			delta=undoRedo.localRedo(s_id);
		}
	};
	var deltaLeft = function(delta){
        if(typeof delta.right!='undefined' && delta.right!=null && fullListCheck(delta.right.edges)) {
            for (var i = 0; i < delta.right.edges.length; i++) {
                clEdge(delta.right.edges[i].getId());
            }
        }
        if(typeof delta.right!='undefined' && delta.right!=null && fullListCheck(delta.right.nodes)) {
			for (var i = 0; i < delta.right.nodes.length; i++)
				clNode(delta.right.nodes[i].getId());
		}
		if(typeof delta.left!='undefined' && delta.left!=null && fullListCheck(delta.left.nodes)) {
			for (var i = 0; i < delta.left.nodes.length; i++)
				putNode(delta.left.nodes[i]);
		}
		if(typeof delta.left!='undefined' && delta.left!=null && fullListCheck(delta.left.edges)) {
			for (var i = 0; i < delta.left.edges.length; i++)
				putEdge(delta.left.edges[i]);
		}
	};
	var deltaRight = function(delta){
        if(typeof delta.left!='undefined' && delta.left!=null && fullListCheck(delta.left.edges)) {
            for (var i = 0; i < delta.left.edges.length; i++)
                clEdge(delta.left.edges[i].getId());
        }
        if(typeof delta.left!='undefined' && delta.left!=null && fullListCheck(delta.left.nodes)) {
			for (var i = 0; i < delta.left.nodes.length; i++)
				clNode(delta.left.nodes[i].getId());
		}
		if(typeof delta.right!='undefined' && delta.right!=null && fullListCheck(delta.right.nodes)) {
			for (var i = 0; i < delta.right.nodes.length; i++)
				putNode(delta.right.nodes[i]);
		}
		if(typeof delta.right!='undefined' && delta.right!=null && fullListCheck(delta.right.edges)) {
			for (var i = 0; i < delta.right.edges.length; i++)
				putEdge(delta.right.edges[i]);
		}
	};
    this.getLabels = function getLabels(id){
        return getNode(id).getId();
    };
    this.getType = function getType(id){
        if(idT(id)=='e')
            return getEdge(id).getType();
        else
            return getNode(id).getType();
    };
    this.getFth = function getFth(id){
        return getNode(id).getFather();
    };
    this.getSons = function getSons(id){
        return getnode(id).getSons();
    };
    this.getNugget = function getNugget(id){
        if(idT(id)=='e')
            return getEdge(id).getNugget();
        else
            return getNode(id).getNugget();
    };
    this.getValues = function getValues(id){
        return getNode(id).getValues();
    };
    this.getUid = function getUid(id){
        return getNode(id).getUid();
    };
    this.getSource = function getSource(id){
        return getEdge(id).getSource();
    };
    this.getTarget = function getTarget(id){
        return getEdge(id).getTarget();
    };
    this.getLastNodeId = function getLastNodeId(){
        return 'n_'+(NODE_ID-1);
    };
    this.getLastEdgeId = function getLastEdgeId(){
        return 'e_'+(EDGE_ID-1);
    }
}
function Relation(){
    var antecedent_to_image={};//hashtable : key : antecedent, values : images
    var image_from_antecedent={};//hashtable : key : image, values : antecedents
    this.addR = function addR(ant_l,img_l){
        for(var i=0;i<ant_l.length;i++) {
            if(!fullListCheck(antecedent_to_image[ant_l[i]]))
                antecedent_to_image[ant_l[i]]=[];
            antecedent_to_image[ant_l[i]] = union(antecedent_to_image[ant_l[i]], img_l);
        }
        for(var i=0;i<img_l.length;i++) {
            if(!fullListCheck(image_from_antecedent[img_l[i]]))
                image_from_antecedent[img_l[i]]=[];
            image_from_antecedent[img_l[i]] = union(image_from_antecedent[img_l[i]], ant_l);
        }
    };
    this.getImg = function getImg(ant){
        if(fullListCheck(antecedent_to_image[ant]))
            return antecedent_to_image[ant].concat();
        else {
            console.log(ant + " doesn't exist in R");
            return null;
        }
    };
    this.getAnt = function getAnt(img){
        if(fullListCheck(image_from_antecedent[img]))
            return image_from_antecedent[img].concat();
        else {
            console.log(img + " doesn't exist in R");
            return null;
        }
    };
    this.clR = function clR(){
        antecedent_to_image={};
        image_from_antecedent={};
    };
    this.rmIm = function rmIm(img){
        if(fullListCheck(image_from_antecedent[img])) {
            for(var i=0;i<image_from_antecedent[img].length;i++){
                var idx=antecedent_to_image[image_from_antecedent[img][i]].indexOf(img);
                if(idx>=0)
                    antecedent_to_image[image_from_antecedent[img][i]].splice(idx,1);
                else
                    console.log("unable to find the image "+img+" in the antecedent hashtable");
            }
            image_from_antecedent[img] = [];
        }
    };
    this.rmAnt = function rmAnt(ant){
        if(fullListCheck(antecedent_to_image[ant])) {
            for(var i=0;i<antecedent_to_image[ant].length;i++){
                var idx=image_from_antecedent[antecedent_to_image[ant][i]].indexOf(ant);
                if(idx>=0)
                    image_from_antecedent[antecedent_to_image[ant][i]].splice(idx,1);
                else
                    console.log("unable to find the antecedent "+ant+" in the image hashtable");
            }

            antecedent_to_image[ant] = [];
        }
    };
    this.rmR = function rmR(ant_l,img_l){
        for(var i=0;i<ant_l.length;i++){
            for(var j=0;j<img_l.length;j++){
                var idx=antecedent_to_image[ant_l[i]].indexOf(img_l[j]);
                if(idx>=0)
                    antecedent_to_image[ant_l[i]].splice(idx,1);
                idx=image_from_antecedent[img_l[j]].indexOf(ant_l[i]);
                if(idx>=0)
                    image_from_antecedent[img_l[j]].splice(idx,1);
            }
        }
    };
    this.log = function log(){
        console.log("relations : ===================>");
        console.log("antecedents->images : ===================>");
        var an_to_im=Object.keys(antecedent_to_image);
        for(var i=0;i<an_to_im.length;i++){
            console.log(an_to_im[i]+ " : ");
            console.log(antecedent_to_image[an_to_im[i]].concat());
        }
        console.log("images->antecedents : ===================>");
        var im_to_an=Object.keys(image_from_antecedent);
        for(var i=0;i<im_to_an.length;i++){
            console.log(im_to_an[i]+ " : ");
            console.log(image_from_antecedent[im_to_an[i]].concat());
        }
    };
}
function Tree(label,fth){//simple tree structure
    this.label=label;
    this.sons=[];
    this.fth=fth;
    this.addSon = function addSon(label){
        this.sons.push(new Tree(label,this));
    };
}
function Kami(){//define the full workflow object
    var NUGGET_ID=0;
    var UID=0;
    var nugg_graph=new LayerGraph();
    var ngg_R_acg=new Relation();
    var act_graph=new LayerGraph();
    var acg_R_lcg=new Relation();
    var lcg =new LayerGraph();
    var current_ng_id='ng_0';
    var selected_nodes=[];
    var projected_nuggets=[];
    var current_state="NGG";
    var current_layer=nugg_graph;
    this.addNugget(){

    };
    this.setCurrentNg(ng_id)


    var setState = function(st){
        console.log("call to setstate");
        if(st==current_state){
            console.log("state already in "+st+" state, skiping command");
            return;
        }
        switch(st){
            case "ACG":
                current_state="ACG";
                break;
            case "NGG":
                current_state="NGG";
                break;
            case "LCG":
                current_state="LCG";
                break;
            case "KPV":
                current_state="KPV";
                break;
        }
    };


    
}



var cmdParser = function(cmd){//parse command lines : [tar[@ctx]] act tar[@ctx]; cmd lines
    var cmd_l=cmd.split(/;\n+/);
    for(var i=0;i<cmd_l.length-1;i++){
        var cmd_ct=cmd_l[i].split(" ");
        var ct=[];
        var tar={'left':[],'right':[]};
        var act=null;
        if(cmd_ct.length<3){
            var nodes=cmd_ct[1].split('@');
            if(nodes.length>1)
                ct.concat(nodeParse(nodes[1]));
            tar.left.concat(nodeParse(nodes[0]));
            act=parseAction(cmd_ct[0]);
        }else if(cmd_ct.length==3){
            var nodes=cmd_ct[0].split('@');
            if(nodes.length>1)
                ct.concat(nodeParse(nodes[1]));
            tar.left.concat(nodeParse(nodes[0]));
            act=parseAction(cmd_ct[1]);
            nodes=cmd_ct[2].split('@');
            if(nodes.length>1)
                ct.concat(nodeParse(nodes[1]));
            tar.right.concat(nodeParse(nodes[0]));
        }
        cmdToNode(ct);
        cmdToNode(tar.left);
        cmdToNode(tar.right);
        cmdToAct(act,tar);
        nuggetProjection("ng_"+NUGGET_ID);//update ngg_R_acg and act_graph
        NUGGET_ID++;
        uiUpdate();//update the GUI
    }
};
var cmdToNode = function(node_text){
    var tree=cmdToTree(node_text);
    treeToNode(tree);
};
var cmdToTree = function(node_text){//return a tree structure corresponding to a specific sentence
    var token="";
    var ret=new Tree("root",null);
    var current_node=ret;
    for(var i=0;i<node_text.length;i++){
        var next_c = node_text.charAt(i);

        if(next_c!='(' && next_c!=',' && next_c!=')') {
            token += next_c;
        }
        else if(next_c==','){
            if(token!="") {
                current_node.addSon(token);
                token = "";
            }
        }
        else if(next_c=='('){
            if(token!="") {
                current_node.addSon(token);
                token = "";
            }
            current_node=current_node.sons[current_node.sons.length-1];
        }
        else if(next_c==')'){
            if(token!="") {
                current_node.addSon(token);
                token = "";
            }
            current_node=current_node.fth;
        }
    }
    if(token!="") {//flush the last token
        current_node.addSon(token);
    }
    return ret;
};
var treeToNode = function(tree){
    for(var i=0;i<tree.sons.length;i++){
        switch(tree.sons[i].label.charAt(0)){
            case '.':
                var node_uid=checkUid(tree.sons.label.substr(1),act_graph);//find if the label is an uid or if the label correspond to one
                nugg_graph.addNode(["component","keyres"],NUGGET_ID,tree.sons.label.substr(1),[],node_uid);
                var n_fth=nugg_graph.getNodeByLabels([tree.label.substr(1)])
                if(fullListCheck(n_fth)){
                    if(n_fth.length==1)
                        nugg_graph.addEdge(t,ng,i,o);
                    else
                        console.log("multiple possible root for "+tree.label.substr(1)+", please specify an Uid");

                }


        }
    }
}
var cmdToAct = function(act,target_nodes){

};





/*
TODO
afficher graph
gerer event
switch de vue
projection (from nugget to action graph)
compilation (use only action graph) 
traduction (use lcg+nugget)
attention: un noeud de nugget peut au final correspondre � de multiple noeud dans le lcg !, il peut aussi avoir disparu, inversement un noeud du lcg peut correspondre � plusieur noeud dans les nuggets !
regle Kappa : on prend les action du LCG et les noeuds du LCG et on regarde les nuggets qui les mentionnent.
*/
//notes : cr�er tout les flag en kappa avec un state default : ask user.
//also ask for default rates.
//penser que label des agent strictement differents ! si un label en commun alors c'est le meme agent !