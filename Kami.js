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
	if(s_l.length==0)
		return [];
	if(s_l.length==1)
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
	if(s_l.length==0)
		return [];
	if(s_l.length==1)
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
	var type=t;//this node type : component(1)/action(2)/super(3)/attribute (1):agent/region/keyres/flag (2):mod/modPos/modNeg/syn/deg/bnd/brk/input/output (3):family/set/process
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
	this.copy = function copy(i){
		return new Node(i,type.concat(),nuggets.concat(),labels.concat(),values.concat(),uid);
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
	};
	this.copy = function copy(i){
		return new Edge(i,type,nuggets.concat(),source,target);
	};
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
function LayerGraph(){//An autonomous multi layer graph with optimized modification actions (all in O(1)) except removal/merge in O(Max(node arity)) and undo redo stack with similar time optimizations
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
		if(typeof(nodes[id])!=undefined && nodes[id]!=null)
			return nodes[id];
		else return null;
	};
	this.getNodes = function getNodes(){//return the whole nodes as a list of id
		return Object.keys(nodes);
	};
	var getEdge = function(id){//return a specific edge for an id
		if(typeof(edges[id])!=undefined && edges[id]!=null)
			return edges[id];
		else return null;
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
		var tmp_uid=n.getUid();//add the node to the Uid hashtable
		if(tmp_uid!=null){
			if(fullListCheck(nodesByUid[tmp_uid]))
				nodesByUid[tmp_uid].push(n.getId());
			else nodesByUid[tmp_uid]=[n.getId()];
		}
		var tmp_ng=n.getNugget();//add the node to the Nuggets hashtable
		for(var i=0;i<tmp_ng.length;i++){
			if(fullListCheck(nodesByNuggets[tmp_ng[i]]))
				nodesByNuggets[tmp_ng[i]].push(n.getId());
			else nodesByNuggets[tmp_ng[i]]=[n.getId()];
		}
		return {'ng':n.getNugget()[0],'left':null,'right':{'nodes':[n.clone()],'edges':[]}};
	};
	this.addNode = function addNode(t,ng,l,v,u){//add a NEW node return its id.
		var n=new Node('n_'+NODE_ID++,t,ng,l,v,u);
		var delta=putNode(n)
		undoRedo.stack(delta);
		retun deltaToId(delta);
	};
	var clNode = function(id){//internal removing function : return a delta object
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
		var delta=clNode(id);
		undoRedo.stack(delta);//return Delta
		return deltaToId(delta);
	};
	this.mergeNode = function mergeNode(id1,id2){//merge two node in a third one and return its id
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
		return deltaToId(delta);
	}
	var deltaToId = function(delta){//return an enter/exit object with the id of all elements added/removed for an action.
		var ret ={'enter':[],'exit':[]};
		for(var i=0;i<delta.right.nodes.length;i++)
			ret.enter.push(delta.right.nodes[i].getId());
		for(var i=0;i<delta.right.edges.length;i++)
			ret.enter.push(delta.right.edges[i].getId());
		for(var i=0;i<delta.left.nodes.length;i++)
			ret.exit.push(delta.left.nodes[i].getId());
		for(var i=0;i<delta.left.edges.length;i++)
			ret.exit.push(delta.left.edges[i].getId());
		return ret;
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
		return deltaToId(ret);
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
		return deltaToId(ret);
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
		return deltaToId(ret);
	};
	this.addNodeValues = function addNodeValues(id,l){//add some values to a node
		var ret={'ng':nodes[id].getNugget()[0],'left':{'nodes':[nodes[id].clone()],'edges':[]},'right':{'nodes':[],'edges':[]}};
		nodes[id].addValues(l);
		ret.right.nodes.push(nodes[id].clone());
		undoRedo.stack(ret);
		return deltaToId(ret);
	};
	this.rmNodeValues = function rmNodeValues(id,l){//remove values from a node if l is null or [], remove all the Values
		var ret={'ng':nodes[id].getNugget()[0],'left':{'nodes':[nodes[id].clone()],'edges':[]},'right':{'nodes':[],'edges':[]}};
		if(fullListCheck(l))
			nodes[id].rmValues(l);
		else nodes[id].deleteValues();
		ret.right.nodes.push(nodes[id].clone());
		undoRedo.stack(ret);
		return deltaToId(ret);
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
		var delta=putEdge(e);
		undoRedo.stack(delta);
		return deltaToId(delta);
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
		var delta=clEdge(id);
		undoRedo.stack(delta);
		return deltaToId(delta);
	};
	this.getNodeByLabels = function getNodeByLabels(labels){//return a nodes id list corresponding to the specific labels
		var nodes_lists =[];
		for(var i=0;i<labels.length;i++){
			var tmp_l=nodesByLabel[labels[i]];
			if(fullListCheck(tmp_l))
				nodes_lists.push(tmp_l);
		}
		return multiIntersection(nodes_lists);
	};
	this.getNodeByUid = function getNodeByUid(uid){//return the node id corresponding to a specific uid
		var ret=[];
		if(fullListCheck(nodesByUid[uid]))
			ret=nodesByUid[uid].concat();
		return ret;
	};
	this.getNodeByNugget = function getNodeByNugget(n_id){//return all nodes in a specific nugget
		var ret=[];
		if(fullListCheck(nodesByNuggets[n_id])
			ret=nodesByNuggets[n_id].concat();
		return ret;
	}
	this.getEdgeBySource = function getEdgeBySource(iid){//return all the edges corresponding to a specific input (id list)
		var ret=[];
		if(fullListCheck(edgesBySource[iid]))
			ret=edgesBySource[iid].concat();
		return ret;
	};
	this.getEdgeByTarget = function getEdgeByTarget(oid){//return all the edges corresponding to a specific output (id list)
		var ret=[];
		if(fullListCheck(edgesByTarget[oid]))
			ret=edgesByTarget[oid].concat()
		return ret;
	};
	this.getEdgeByNugget = function getEdgeByNugget(n_id){//return all edges in a specific nugget
		var ret=[];
		if(fullListCheck(edgesByNuggets[n_id]))
			ret=edgesByNuggets[n_id].concat();
		return ret;
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
	this.undo = function undo(){//Undo the last action and return an exit/enter object
		delta=undoRedo.undo();
		deltaLeft(delta);
		return deltaToId(delta);
	};
	this.redo = function redo(){//redo the last action undowed and return an exit/enter object
		var delta=undoRedo.redo();
		deltaRight(delta);
		return deltaToId(delta);
	};
	this.localUndo = function localUndo(s_id){//undo the last action in a specific nugget and return an exit/enter object
		var delta=undoRedo.localUndo(s_id);
		deltaLeft(delta);
		return deltaToId(delta);
	};
	this.localRedo = function localRedo(s_id){//redo the last undowed action in a specific nugget and return an exit/enter object
		var delta=undoRedo.localRedo(s_id);
		deltaRight(delta);
		return deltaToId(delta);
	};
	this.stackClear = function stackClear(){//clear the whole undo/redo stack
		undoRedo.clear();
	};
	this.stackLocClear = function stackLocClear(s_id){//clear a local stack for the s_id nugget
		undoRedo.clearLocal(s_id);
	};
	this.undoNugget = function undoNugget(s_id){//undo a whole nugget and return an enter/exit object.
		var delta=undoRedo.localUndo(s_id);
		var ret=deltaToId(delta);
		while(delta!=null){
			deltaLeft(delta);
			delta=undoRedo.localUndo(s_id);
			var tmp=deltaToId(delta);
			ret.enter=union(ret.enter,tmp.enter);//acumulator for enter
			ret.exit=union(ret.exit,tmp.exit);//acumulator for exit
		}
		return ret;
	};
	this.redoNugget = function redoNugget(s_id){//redo a whole nugget undowed and return an exit/enter object
		var delta=undoRedo.localRedo(s_id);
		var ret=deltaToId(delta);
		while(delta!=null){
			deltaRight(delta);
			delta=undoRedo.localRedo(s_id);
			var tmp=deltaToId(delta);
			ret.enter=union(ret.enter,tmp.enter);//acumulator for enter
			ret.exit=union(ret.exit,tmp.exit);//acumulator for exit
		}
		return ret;
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
		var ret={'enter':[],'exit':[]};
        if(typeof delta.left!='undefined' && delta.left!=null && fullListCheck(delta.left.edges)) {
            for (var i = 0; i < delta.left.edges.length; i++)
                ret.exit.push(clEdge(delta.left.edges[i].getId()));
        }
        if(typeof delta.left!='undefined' && delta.left!=null && fullListCheck(delta.left.nodes)) {
			for (var i = 0; i < delta.left.nodes.length; i++)
				ret.exit.push(clNode(delta.left.nodes[i].getId()));
		}
		if(typeof delta.right!='undefined' && delta.right!=null && fullListCheck(delta.right.nodes)) {
			for (var i = 0; i < delta.right.nodes.length; i++)
				ret.enter.push(putNode(delta.right.nodes[i]));
		}
		if(typeof delta.right!='undefined' && delta.right!=null && fullListCheck(delta.right.edges)) {
			for (var i = 0; i < delta.right.edges.length; i++)
				ret.enter.push(putEdge(delta.right.edges[i]));
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
    /*this.copy = function copy(id){//unsafe ?
    	if(idT(id)=='e') {
			var e=getEdge(id).copy('e_'+EDGE_ID++);
		}	
		else if (idT(id)=='n') return getNode(id).copy('n_'+NODE_ID++);
			else console.error("undefined id type : "+idT(id));
	}*/
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
    };
}
function Relation(){
    var antecedent_to_image={};//hashtable : key : antecedent, values : images
    var image_from_antecedent={};//hashtable : key : image, values : antecedents
    this.addR = function addR(ant_l,img_l){//add a relation between a list of antecedents and a list of images
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
    this.getImg = function getImg(ant){//get all the images of a specific antecedent
        if(fullListCheck(antecedent_to_image[ant]))
            return antecedent_to_image[ant].concat();
        else {
            console.log(ant + " doesn't exist in R");
            return null;
        }
    };
    this.getAnt = function getAnt(img){//get all the antecedents of a specific image
        if(fullListCheck(image_from_antecedent[img]))
            return image_from_antecedent[img].concat();
        else {
            console.log(img + " doesn't exist in R");
            return null;
        }
    };
    this.clR = function clR(){//clear the whole relation
        antecedent_to_image={};
        image_from_antecedent={};
    };
    this.rmIm = function rmIm(img){//remove a specific image
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
    this.rmAnt = function rmAnt(ant){//remove a specific antecedent
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
    this.rmR = function rmR(ant_l,img_l){//remove all relations between a list of antecedent and a list of images
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
    this.log = function log(){//log a whole relation
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
function Nugget(i,n,c){
	var name = n || i;
	var id = i;
	var comments= c || "";
	var visible = true;
	this.getName = function getName(){ return name;};
	this.getId = function getId(){ return id;};
	this.getComment = function getComment(){ return comments;};
	this.isVisible = function isVisible(){ return visible;};
	this.setName = function setName(n){ name=n;};
	this.setComment = function setComment(c){comments = c;};
	this.show = function show(){ visible=true;};
	this.hide = function hide(){visible=false;};
	this.log = function log(){
		console.log("Nugget "+id);
		console.log("name : "+name);
		console.log("comment : "+comments);
		console.log("visible : "+visible);
	};
}
function Kami() {//define the full workflow object, all the modification functions return an enter/exit object for all the graph (ngg, acg, lcg). Allow to do all updates localy !
	var NUGGET_ID = 0;//id of nuggets for the nugget graph
	var UID = 0;//uid for projection
	var nugg_graph = new LayerGraph();//nuggets graph
	var ngg_R_acg = new Relation();//projection of nuggets into actions
	var act_graph = new LayerGraph();//actions graph
	var acg_R_lcg = new Relation();//projection of actions into LCG
	var lcg = new LayerGraph();//Logical contact graph
	var nuggets ={};//hashtable of all nuggets objects.
	var getLg = function(lg_name){//return the lg graph corresponding to the lg_name
		switch(lg_name){
            case "ACG":
                return act_graph;
            case "NGG":
                return nugg_graph;
            case "LCG":
                return lcg;
			default:
				console.error("unknown value : "+lg_name);
        }
	};
	this.getNuggets = function getNuggets(){
		return Object.keys(nuggets);
	};
	this.getNodes = function getNodes(lg_name){
       return getLg(lg_name).getNodes();
    };
	this.getEdges = function getEdges(lg_name){//return the whole edges as a list of id
		return getLg(lg_name).getEdges();
	};
	var LocAddNode = function (t,ng,l,v,u,lg_name){//internal function adding nodes to a lg
		return getLg(lg_name).addNode(t,ng,l,v,u);
	};
	this.addNode = function addNode(t,ng,l,v,u){//add a new node to kami : add the node to a nugget, if this nugget is visible, update the acg and the projection function. return the delta corresponding to modified nodes/edges id
		var delta={"NGG":null,"ACG":null,"LCG":null};
		if(idV(ng)>=NUGGET_ID){
			console.error("This nugget isn't defined ! "+ng);
			return delta;
		}
		if(!u)
			delta.NGG=LocAddNode(t,ng,l,v,"u_"+UID++,"NGG");
		else if(idT(u)=="u" && idV(u)>=UID){
			console.error("this uid doesn't exist ! "+u);
			return delta;
		}else
			delta.NGG=LocAddNode(t,ng,l,v,u,"NGG");
		if(isNgVisible(ng))
			delta.ACG=updateNRA(delta.NGG);
		return delta;
	}
	var updateNRA = function(delta){//update the nugget to acg relation. take the enter/exit object from the nugget graph and return the enter/exit object for the Action graph !
		var ret={'exit':[],'enter':[]};
		for(var i=0;i<delta.exit.length;i++){//remove all nodes witch are in the exit segment from the projection table
			var pr_id=ngg_R_acg.getImg(delta.exit[i])[0];
			ngg_R_acg.rmAnt(delta.exit[i]);
			if(getAnt(pr_id).length==0){//if the projection have no antecedents remaining, remove it from the ACG
				if(idT(pr_id)=="n"){
					var tmp_delta=act_graph.rmNode(pr_id);
					ret.exit=union(ret.exit,tmp_delta.exit);
					ret.enter=union(ret.enter,tmp_delta.enter);
				}
				else if(idT(pr_id)=="e"){
					var tmp_delta=act_graph.rmEdge(pr_id);
					ret.exit=union(ret.exit,tmp_delta.exit);
					ret.enter=union(ret.enter,tmp_delta.enter);
				}
				else {
					console.error("unknown type of element : "+delta.exit[i]);
					return;
				}
			}
		}
		for(var i=0;i<delta.enter.length;i++){//add all nodes/edges of the enter segment in the projection table 
			if(idT(delta.enter[i])=="n"){//projection for nodes
				var tmp_uid=nugg_graph.getUid(delta.enter[i]);
				var pr_id=act_graph.getNodeByUid(tmp_uid);//if the added node image doesn't exit yet, create it. add it to the antecedent of the image node : image node have the same uid !
				if(!pr_id || pr_id.length==0){//create a copy of the nugget node (no sons, no father until we add edges !)
					var tmp_delta=act_graph.addNode(nugg_graph.getType(delta.enter[i]),
												nugg_graph.getNugget(delta.enter[i]),
												nugg_graph.getLabels(delta.enter[i]),
												nugg_graph.getValues(delta.enter[i]),
												nugg_graph.getUid(delta.enter[i]));
					pr_id=act_graph.getLastNodeId();//our projection will be the newly created node !
					ret.enter=union(ret.enter,tmp_delta.enter);
					ret.exit=union(ret.exit,tmp_delta.exit);
				}
				else pr_id=pr_id[0];//flatten this 1 element list !
				ngg_R_acg.addR([delta.enter[i]],[pr_id]);//add the projection relation between this node and the ACG node.
			}
			else if(idT(delta.enter[i])=="e"){//projection for edges !!!!!!!=======!!!!!! trying some unsafe delay ! may need some guards!
				var s_id=nugg_graph.getSource(delta.enter[i]);
				var t_id=nugg_graph.getTarget(delta.enter[i]);
				var pr_s=ngg_R_acg.getImg(s_id)[0];//flatten this one element list
				var pr_t=ngg_R_acg.getImg(t_id)[0];//flatten this one element list
				if(!pr_s || !pr_t){//if the source or target projection doesn't exist yet, delay the edge projection !
					console.log("edge delayed ! "+ delta.enter[i]);
					delta.enter.push(delta.enter[i]);
					delta.enter.splice(i--,1);//don't let i being updated !
				}
				else{
					var pr_e=Intersection([act_graph.getEdgeBySource(pr_s),act_graph.getEdgeByTarget(pr_t));//get all existing edges i the ACG connecting the same source and id
					for(var k=0;k<pr_e.length;k++){//remove all edge of the wrong type
						if(act_graph.getType(pr_e[k])==nugg_graph.getType(delta.enter[i]))
							pr_e.splice(k--,1);
					}
					if (pr_e.length==0){//if there is no edges in the ACG, create an edge and update the delta!
						var tmp_delta=act_graph.addEdge(nugg_graph.getType(delta.enter[i]),
														nugg_graph.getNugget(delta.enter[i]),
														pr_s,
														pr_t);
						ret.enter=union(ret.enter,tmp_delta.enter);
						ret.exit=union(ret.exit,tmp_delta.exit);
						pr_e=act_graph.getLastEdgeId();
					} 
					else if(pr_e.length==1)
						pr_e=pr_e[0];//flatten the one element list
					else {
						console.error("more images than excepted for : "+delta.enter[i]);//if there is more than one edge, it is a mistake in the whole code !
						return;
					}
					ngg_R_acg.addR([delta.enter[i],[pr_e]);
				}
			}
			else {
				console.error("unknown type of element : "+delta.enter[i]);
				return;
			}
			
		}
		return ret;			
	}
	this.rmNode = function rmNode(id,lg_name){//remove a specific node and return a delta
		return getLg(lg_name).rmNode(id);
	};
	this.mergeNode = function mergeNode(id1,id2,lg_name){//merge two node in a third one and return a delta
		return getLg(lg_name).mergeNode(id1,id2);
	}
	this.addNodeLabels = function addNodeLabels(id,l,lg_name){//add some labels to a node
		return getLg(lg_name).addNodeLabels(id,l);
	};
	this.rmNodeLabels = function rmNodeLabels(id,l,lg_name){//remove labels from a node if l is null or [], remove all the labels
		return getLg(lg_name).rmNodeLabels(id,l);
	};
	this.chNodeUid = function chNodeUid(id,uid,lg_name){//change Node Uid
		return getLg(lg_name).chNodeUid(id,uid,lg_name);
	};
	this.addNodeValues = function addNodeValues(id,l,lg_name){//add some values to a node
		return getLg(lg_name).addNodeValues(id,l,lg_name);
	};
	this.rmNodeValues = function rmNodeValues(id,l,lg_name){//remove values from a node if l is null or [], remove all the Values
		return getLg(lg_name).rmNodeValues(id,l);
	};
	this.addEdge = function addEdge(t,ng,i,o,lg_name){//add a NEW edge 
		return getLg(lg_name).addEdge(t,ng,i,o);
	};
	this.rmEdge = function rmEdge(id,lg_name){//remove an edge
		return getLg(lg_name).rmEdge(id);
	};
	this.getNodeByLabels = function getNodeByLabels(labels,lg_name){//return a nodes id list corresponding to the specific labels
		return getLg(lg_name).getNodeByLabels(labels);
	};
	this.getNodeByUid = function getNodeByUid(uid,lg_name){//return the node id corresponding to a specific uid
		return getLg(lg_name).getNodeByUid(uid);
	};
	this.getNodeByNugget = function getNodeByNugget(n_id,lg_name){//return all nodes in a specific nugget
		return getLg(lg_name).getNodeByNugget(n_id);
	}
	this.getEdgeBySource = function getEdgeBySource(iid,lg_name){//return all the edges corresponding to a specific input (id list)
		return getLg(lg_name).getEdgeBySource(iid);
	};
	this.getEdgeByTarget = function getEdgeByTarget(oid,lg_name){//return all the edges corresponding to a specific output (id list)
		return getLg(lg_name).getEdgeByTarget(oid);
	};
	this.getEdgeByNugget = function getEdgeByNugget(n_id,lg_name){//return all edges in a specific nugget
		return getLg(lg_name).getEdgeByNugget(n_id);
	};
	this.undo = function undo(lg_name){//Undo the last action and return an exit/enter object
		return getLg(lg_name).undo();
	};
	this.redo = function redo(lg_name){//redo the last action undowed and return an exit/enter object
		return getLg(lg_name).redo();
	};
	this.localUndo = function localUndo(s_id,lg_name){//undo the last action in a specific nugget and return an exit/enter object
		return getLg(lg_name).localUndo(s_id);
	};
	this.localRedo = function localRedo(s_id,lg_name){//redo the last undowed action in a specific nugget and return an exit/enter object
		return getLg(lg_name).localRedo(s_id);
	};
	this.stackClear = function stackClear(lg_name){
		getLg(lg_name).stackClear();
	};
	this.stackLocClear = function stackLocClear(s_id,lg_name){
		getLg(lg_name).stackLocClear(s_id);
	};
	this.undoNugget = function undoNugget(s_id,lg_name){//undo a whole nugget and return an enter/exit object.
		return getLg(lg_name).undoNugget(s_id);
	};
	this.redoNugget = function redoNugget(s_id,lg_name){//redo a whole nugget undowed and return an exit/enter object
		return getLg(lg_name).redoNugget(s_id);
	};
    this.getLabels = function getLabels(id,lg_name){
        return getLg(lg_name).getLabels(id);
    };
    this.getType = function getType(id,lg_name){
        return getLg(lg_name).getType(id);
    };
    this.getFth = function getFth(id,lg_name){
        return getLg(lg_name).getFth(id);
    };
    this.getSons = function getSons(id,lg_name){
        return getLg(lg_name).getSons(id);
    };
    this.getNugget = function getNugget(id,lg_name){
        return getLg(lg_name).getNugget(id);
    };
    this.getValues = function getValues(id,lg_name){
        return getLg(lg_name).getValues(id);
    };
    this.getUid = function getUid(id,lg_name){
        return getLg(lg_name).getUid(id);
    };
    this.getSource = function getSource(id,lg_name){
        return getLg(lg_name).getSource(id);
    };
    this.getTarget = function getTarget(id,lg_name){
        return getLg(lg_name).getTarget(id);
    };
    this.getLastNodeId = function getLastNodeId(lg_name){
        return getLg(lg_name).getLastNodeId();
    };
    this.getLastEdgeId = function getLastEdgeId(lg_name){
		return getLg(lg_name).getLastEdgeId();
	};
    this.addNugget = function addNugget(n,c){//add a new nugget to Kami background knowledge.
		var ng=new Nugget('ng_'+(NUGGET_ID++),n,c);
		nuggets[ng.getId()]=ng;
		return ng.getId();
	};
	this.showNugget = function showNugget(nid){//add a specific nugget to the action graph.
		nuggets[nid].show();
		return nid;
	};
	this.hideNugget = function hideNugget(nid){
		nuggets[nid].hide();
		return nid;
	}
	this.getNgName = function getNgName(nid){
		return nuggets[nid].getName();
	};
	this.getNgComment = function getNgComment(nid){
		return nuggets[nid].getComment();
	};
	this.isNgVisible = function isNgVisible(nid){
		return nuggets[nid].isVisible()
	};
	this.setNgName = function setNgName(n,nid){
		nuggets[nid].setName(n);
		return nid;
	};
	this.setNgComment = function setNgComment(c,nid){
		nuggets[nid].setComment(c);
		return nid;
	};
	this.log = function log(){
        console.log("Kami : ===================");
        console.log("Nugget graph : ");
        nugg_graph.log();
        console.log("Action graph : ");
        act_graph.log();
        console.log("Logical contact graph : ");
        lcg.log();
        console.log("projections : ===================");
        console.log("Nugget to Action");
        ngg_R_acg.log();
        console.log("Action to LCG");
        acg_R_lcg.log();
		console.log("Nuggets informations : ===================");
		var key=Object.keys(nuggets);
		for(var i=0;i<key.length)
			nuggets[key[i]].log();
    };
}
