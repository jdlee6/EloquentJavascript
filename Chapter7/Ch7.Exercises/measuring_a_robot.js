/*
Measuring a Robot


Write a function 'compareRobots' that takes 2 robots (and their starting memory)

It should generate 100 tasks and let each of the robots solve each of these tasks

When DONE, it should output the average number of steps each robot took per task


** For the sake of fairness, make you give each task to BOTH robots, rather than generating different tasks per robot
*/


// test code in a_robot.js
function robotSteps(state, robot, memory) {
    for (let step = 0;;step++) {
        // return # of steps it took
        if (state.parcels.length == 0) return step;
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
}

function compareRobots(robot1, memory1, robot2, memory2) {
    let total1 = 0, total2 = 0;
    // 100 trials
    for (let step = 0; step < 100; step++) {
        let state = VillageState.random();
        total1 += robotSteps(state, robot1, memory1);
        total2 += robotSteps(state, robot2, memory2);
    }
    console.log(`Robot 1 has finished in ${total1 / 100} steps`)
    console.log(`Robot 2 has finished in ${total2 / 100} steps`)
}

compareRobots(routeRobot, [], goalOrientedRobot, [])
// Robot 1 has finished in 18.17 steps
// Robot 2 has finished in 15.03 steps