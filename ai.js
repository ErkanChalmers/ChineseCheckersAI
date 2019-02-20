let nodeCount = 0;
let hasher;

function constructStateTree(state, maxDepth){
	nodeCount = 0; 

	let root = {
		state : state,
		children : [],
		moves : []
	}

	hasher = new Hasher(300000);
	hasher.put(root.state);

	//TODO: not return
	return recConstructStateTree(root, 0, maxDepth);

	//TODO: evaluate best branch
}

function recConstructStateTree(node, depth, maxDepth){
	if (depth >= maxDepth)
		return node;

	let playerIndex = (depth+1) % 2;
	let player = playerIndex + 1;

	for(let i = 0; i < node.state.length; i++){
		if(node.state[i] == player){
			for (let target of calculatePotentialTargets(node.state, i)){
				node.moves.push({src: i, dest: target});
				let newState = node.state.slice();
				newState[i] = 0;
				newState[target] = player;
			
				let childNode = {
					state : newState,
					children : [],
					moves : []
				};

				if (!hasher.contains(newState)){
					hasher.put(newState);
					node.children.push(recConstructStateTree(childNode, depth+1, maxDepth));
					nodeCount++;
				}
			}
		}
	}

	return node;
}
