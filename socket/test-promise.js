const connect = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('done')
		}, 2000)
	})
}

async function fun() {
	const res = await connect()
	console.log(res);
	return res
}

// bar = fun()
// console.log(bar);

connect().then((res) => {
	console.log(res);
})