const wait = t => new Promise(r => setTimeout(r, t))

test('enqueue operations', async () => {

    const op1 = async () => { await wait(100); return 100 }
    const op2 = async () => { await wait(200); return 200 }
    const op3 = async () => { await wait(300); return 300 }
    const op4 = async () => { await wait(400); return 400 }

    const results = await Promise.all([
        App.enqueueOperation(() => op4()),
        App.enqueueOperation(() => op1()),
        App.enqueueOperation(() => op3()),
        App.enqueueOperation(() => op2()),
    ])

    expect(results).toEqual([ 400, 100, 300, 200 ])
}, 12000)