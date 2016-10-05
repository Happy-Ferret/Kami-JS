/*
Kami contain a list of nuggets and there projection on a type graph called action graph.
Kami is also able to transform those generic graph into site graph
compatible with simulation using a predefined set of rewriting rules.
The result of those rules is what we call the LCG and Kappa graph.
Kami also take as "semantic constraints" a set of rules to apply to the whole nugget/action graph!
define the full workflow object, all the modification functions return an enter/exit
object for all the graph (ngg, acg, lcg,kag). Allow to do all updates localy !
*/
	/* add a new node to Kami
	 * if it is part of a nugget, this node is added to the nugget graph
	 * if this node is a new "type", create a new node in the act graph and create a new 'virtual' nugget generating it
	 * this node is projected (typed) by the action graph.
	 * it take a nugget number, a label list (or null) and a uid
	 * the uid must exist, if it isn't defined a new one is generated 
 */
	/* add a new edge to Kami
	 * edges are oriented !
	 * if it is part of a nugget, this node is added to the nugget graph
	 * if this edge is a new one, create a new edge in the act graph and create a new 'virtual' nugget generating it
	 * this edge is projected (typed) by the action graph.
	 * it take a list of type, a nugget number, a source and a target.
	 * an edge doesn't have is own uid. it will be projected according to its node and target uid
 */
function Kami(){
	var nuggets ={};
	this.init = function init(){//add the root immuable graph defining the notion of graph
		var tmp=new Nugget("g_0","Root","Graph definition");
			tmp.getGraph().addNode("NODE",["Node"]);
			tmp.getGraph().addEdge("EDGE","n_0","n_0");
			console.log("root generated !");
		nuggets["g_0"]=tmp;
	}
	var undoRedo = new UndoRedoStack();
	var NUGGET_ID = 1;
	var FUNCTION_CALL = 0;
	this.addNugget = function addNugget(n,c,f){
		fth=f||"g_0";
		console.log(fth);
		nuggets["g_"+NUGGET_ID]=new Nugget("g_"+NUGGET_ID,n,c);
		nuggets["g_"+NUGGET_ID].setFather(fth);
		nuggets[fth].addSon("g_"+NUGGET_ID);
		NUGGET_ID++;
		//undoRedo.stack(null,nuggets["g_"+NUGGET_ID].saveState());	
	};
	this.rmNugget = function rmNugget(g_id,force){
		if(g_id=="g_0")
			throw new Error("can't remove the ROOT nugget");
		if(!nuggets[g_id])
			throw new Error ("unexisting nugget : "+g_id);
		else if(nuggets[g_id] && !nuggets[g_id].hasSon()){
			nuggets[nuggets[g_id].getFather()].rmSon(g_id);
			delete nuggets[g_id];
		}
		else if(nuggets[g_id] && nuggets[g_id].hasSon() && !force)
			console.error("This nugget has sons, please remove it before, or use rmNugget with force option");
		else if(nuggets[g_id] && nuggets[g_id].hasSon() && force){
			nuggets[g_id].getSons().forEach(function(e){
				this.rmNugget(e,force);
			});
		}	
	};
	this.addNode = function addNode(g,t,l,rec_force){//0 : nothing, 1 : rec, 2: force, 3 : rec & force
		if(nuggets[nuggets[g].getFather()].getGraph().getNodeByType(t).length==0 &&( !rec_force || rec_force==0 || rec_force==1)){
			console.error("the type graph of "+g+" doesn't contain the type "+t+" please use the force option");
			return;
		}else if
		nuggets[g].getGraph.addNode(t,l);
	}
	var recLog = function(e){
		nuggets[e].log();
		console.log("============>");
		if(nuggets[e].hasSon())
			nuggets[e].getSons().forEach(recLog);
	}
	this.log = function log(){
		recLog("g_0");
	}
};

