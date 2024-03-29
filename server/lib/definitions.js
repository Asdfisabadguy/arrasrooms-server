// GUN DEFINITIONS
const combineStats = function(arr) {
    try {
    // Build a blank array of the appropiate length
    let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    arr.forEach(function(component) {
        for (let i=0; i<data.length; i++) {
            data[i] = data[i] * component[i];
        } // Felix: hey i will enter  new graphics
    })    // noice ok
    return {
        reload:     data[0],
        recoil:     data[1],
        shudder:    data[2],
        size:       data[3],
        health:     data[4],
        damage:     data[5],
        pen:        data[6],
        speed:      data[7],
        maxSpeed:   data[8],
        range:      data[9],
        density:    data[10],
        spray:      data[11],
        resist:     data[12],
    };
    } catch(err) {
        console.log(err);
        console.log(JSON.stringify(arr));
    }
};
const setBuild = (build) => {
  let skills = build.split(build.includes("/") ? "/" : "").map((r) => +r);
  if (skills.length !== 10)
    throw new RangeError("Build must be made up of 10 numbers");
  return [6, 4, 3, 5, 2, 9, 0, 1, 8, 7].map((r) => skills[r]);
};
const skillSet = (() => {
    let config = require('../config.json');
    let skcnv = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9,
    };
    return args => {
        let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let s in args) {
            if (!args.hasOwnProperty(s)) continue;
            skills[skcnv[s]] = Math.round(config.MAX_SKILL * args[s]);
        }
        return skills;
    };
})();

const g = { // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
  trap: [39, 1, .25, .65, 1.025, .325, 1.1, 4.9, 1, 1.125, 1, 15, 3],
    swarm: [27, .25, .05, .4, .9, .235, .65, 3.5, 1, 1, 1.25, 5, 1.25],
    abysstrap:          [144,    0,     0.25,   1.4,    2,      2,      3,      8,      1,      1,      1,      15,     3],
  //---------------------------------------------------------------
  // damage only
  double_damage: [1, 1, 1, 1, 1.8, 1.65, 1, 1, 1, 1, 1, 1, 1],
    smaller: [1, 1, 1, 0.8, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    triple_damage: [1, 1, 1, 1, 2.3, 2, 1, 1, 1, 1, 1, 1, 1],
    quadro_damage: [1, 1, 1, 1, 2.7, 2.65, 1, 1, 1, 1, 1, 1, 1],
    half_damage: [1, 1, 1, 1, 0.6, 0.7, 1, 1, 1, 1, 1, 1, 1],
  // health only
    half_health:   [1, 1, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1],
    double_health: [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    trio_health:   [1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1],
    quad_health:   [1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1],
  // size
    biggerbullet: [1, 1, 1, 1.25, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    biggerBullet: [1, 1, 1, 1.25, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    smallBullet: [1, 1, 1, 0.75, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    smallbullet: [1, 1, 1, 0.75, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //---------------------------------------------------------------
    drone: [66, .25, .1, .6, 5, .295, 1, 2.35, 1, 1, 1, .1, 1.1],
    bigdrone: [30, 0.25, 0.1, 1.5, 2.5, 2, 1, 1.5, 1, 1, 1, 0.1, 1],
    verybigdrone: [10, 0.25, 0.1, 2.25, 5, 3, 1, 1.5, 1, 1, 1, 0.1, 1],
    buffed: [5, 1, 1, 8, 15, 1.2, 1.4, 1, 1, 1, 1, 1, 1],
    factory: [72, 1, .1, .7, 2, .2, 1, 3, 1, 1, 1, .1, 1],
    basic: [18.25, 1.4, .1, 1, 2, .2, 1, 4.5, 1, 1, 1, 15, 1],
    destroyerDominator: [6.5, 0, 1, .975, 6, 6, 6, .575, .475, 1, 1, .5, 1],
    gunnerDominator: [1.1, 0, 1.1, .5, .5, .5, 1, 1.1, 1, 1, .9, 1.2, .8],
    trapperDominator: [1.26, 0, .25, 1, 1.25, 1.45, 1.6, .5, 2, .7, 1, .5, 1],
    mothership: [1.25, 1, 1, 1, 1, 1, 1.1, .775, .8, 15, 1, 1, 1.15],
    closer: [1.25, .25, 1, 1, 99999999999999999999999999999999999999, 99999999999999999999999999999999999999, 99999999999999999999999999999999999999, 2.5, 2.25, 1.4, 4, .25, 1],
    opener: [1, .50, 2, 2, 1e6, 1e6, 1e6, 2.5, 2.25, 2.8, 8, .50, 3], 
    blank: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    common: [1, 1, 1, 2, 0.75, 1, 1, 1, 1, 1, 1, 1, 1],
    uncommon: [1, 1, 1, 4, 1.25, 1.125, 1, 1, 1, 1, 1, 1, 1],
    rare: [1, 1, 1, 1, 6, 3, 1.25, 1, 1, 1, 1, 1, 1],
    epic: [1, 1, 1, 1, 8, 5, 1.75, 1, 1, 1, 1, 1, 1],
    legendary: [1, 1, 1, 10, 8, 2.25, 1, 1, 1, 1, 1, 1, 1],
    mythic: [1, 1, 1, 1, 14, 12, 2.5, 1, 1, 1, 1, 1, 1],
    ultra: [1, 1, 1, 1, 18, 16, 2.75, 1, 1, 1, 1, 1, 1],
    super: [1, 1, 1, 1, 24, 22, 3.25, 1, 1, 1, 1, 1, 1],
    ancient: [1, 1, 1, 1, 30, 28, 4, 1, 1, 1, 1, 1, 1],
    hexadoralgun: [1, 1, 1, 1, 1.2, 1.5, 1.7, 1, 1, 1, 1, 1, 1],
    spam: [1.1, 1, 1, 1.05, 1, 1.1, 1, .9, .7, 1, 1, 1, 1.05],
    hurricane: [1, 1, 1, 1, 1.3, 1.3, 1.1, 1.5, 1.15, 1, 1, 1, 1],
    minion: [1, 1, 2, 1, .4, .4, 1.2, 1, 1, .75, 1, 2, 1],
    single: [1.05, 1, 1, 1, 1, 1, 1, 1.05, 1, 1, 1, 1, 1],
    sniper: [1.35, 1, .25, 1, 1, .8, 1.1, 1.5, 1.5, 1, 1.5, .2, 1.15],
    rifle: [.8, .8, 1.5, 1, .8, .8, .9, 1, 1, 1, 1, 2, 1],
    assass: [1.65, 1, .25, 1, 1.15, 1, 1.1, 1.18, 1.18, 1, 3, 1, 1.3],
    hunter: [1.5, .7, 1, .95, 1, .9, 1, 1.1, .8, 1, 1.2, 1, 1.15],
    hunter2: [1, 1, 1, .9, 2, .5, 1.5, 1, 1, 1, 1.2, 1, 1.1],
    preda: [1.4, 1, 1, .8, 1.5, .9, 1.2, .9, .9, 1, 1, 1, 1],
    snake: [.4, 1, 4, 1, 1.5, .9, 1.2, .2, .35, 1, 3, 6, .5],
    sidewind: [1.5, 2, 1, 1, 1.5, .9, 1, .15, .5, 1, 1, 1, 1],
    snakeskin: [.6, 1, 2, 1, .5, .5, 1, 1, .2, .4, 1, 5, 1],
    mach: [.5, .8, 1.7, 1, .7, .7, 1, 1, .8, 1, 1, 2.5, 1],
    blaster: [1, 1.2, 1.25, 1.1, 1.5, 1, .6, .8, .33, .6, .5, 1.5, .8],
    chain: [1.25, 1.33, .8, 1, .8, 1, 1.1, 1.25, 1.25, 1.1, 1.25, .5, 1.1],
    mini: [1.25, .6, 1, .8, .55, .45, 1.25, 1.33, 1, 1, 1.25, .5, 1.1],
    stream: [1.1, .6, 1, 1, 1, .65, 1, 1.24, 1, 1, 1, 1, 1],
    shotgun: [8, .4, 1, 1.5, 1, .4, .8, 1.8, .6, 1, 1.2, 1.2, 1],
    flank: [1, 1.2, 1, 1, 1.02, .81, .9, 1, .85, 1, 1.2, 1, 1],
    tri: [1, .9, 1, 1, .9, 1, 1, .8, .8, .6, 1, 1, 1],
    trifront: [1, .2, 1, 1, 1, 1, 1, 1.3, 1.1, 1.5, 1, 1, 1],
    thruster: [1, 1.5, 2, 1, .5, .5, .7, 1, 1, 1, 1, .5, .7],
    auto: [1.8, .75, .5, .8, .9, .6, 1.2, 1.1, 1, .8, 1.3, 1, 1.25],
    five: [1.15, 1, 1, 1, 1, 1, 1, 1.05, 1.05, 1.1, 2, 1, 1],
    autosnipe: [1, 1, 1, 1.4, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    pound: [2, 2.25, 0.75, 1, 1.52, 1.52, 1.52, 0.85, 0.7, 1, 1, 1, 2],
    destroy: [2.2, 1.8, .5, 1, 1.5, 2, 1.5, .65, .5, 1, 2, 1, 3],
    anni: [1.2, 1.5, 1, 1, 1.1, 1.1, 1.1, 1, 1, 0.9, 1, 1, 1.05],
    hive: [1.5, .8, 1, .8, .7, .3, 1, 1, .6, 1, 1, 1, 1],
    arty: [1.2, .7, 1, .9, 1, 1, 1, 1.15, 1.1, 1, 1.5, 1, 1],
    mortar: [1.2, 1, 1, 1, 1.1, 1, 1, .8, .8, 1, 1, 1, 1],
    spreadmain: [.78125, .25, .5, 1, .5, 1, 1, 1.5 / .78, .9 / .78, 1, 1, 1, 1],
    spread: [1.5, 1, .25, 1, 1, 1, 1, .7, .7, 1, 1, .25, 1],
    skim: [1, .8, .8, .9, 1.35, .8, 2, .3, .3, 1, 1, 1, 1.1],
    twin: [1, .5, .9, 1, .9, .7, 1, 1, 1, 1, 1, 1.2, 1],
    bent: [1.1, 1, .8, 1, .9, 1, .8, 1, 1, 1, .8, .5, 1],
    triple: [1.2, .667, .9, 1, .85, .85, .9, 1, 1, 1, 1.1, .9, .95],
    quint: [1.5, .667, .9, 1, 1, 1, .9, 1, 1, 1, 1.1, .9, .95],
    dual: [2, 1, .8, 1, 1.5, 1, 1, 1.3, 1.1, 1, 1, 1, 1.25],
    double: [1, 1, 1, 1, 1, .9, 1, 1, 1, 1, 1, 1, 1],
    hewn: [1.25, 1.5, 1, 1, .9, .85, 1, 1, .9, 1, 1, 1, 1],
    puregunner: [1, .25, 1.5, 1.2, 1.35, .25, 1.25, .8, .65, 1, 1.5, 1.5, 1.2],
    machgun: [.66, .8, 2, 1, 1, .75, 1, 1.2, .8, 1, 1, 2.5, 1],
    gunner: [1.25, .25, 1.5, 1.1, 1, .35, 1.35, .9, .8, 1, 1.5, 1.5, 1.2],
    power: [1, 1, .6, 1.2, 1, 1, 1.25, 2, 1.7, 1, 2, .5, 1.5],
    nail: [.85, 2.5, 1, .8, 1, .7, 1, 1, 1, 1, 2, 1, 1],
    fast: [1, 1, 1, 1, 1, 1, 1, 1.2, 1, 1, 1, 1, 1],
    turret: [2, 1, 1, 1, .8, .6, .7, 1, 1, 1, .1, 1, 1],
    battle: [1, 1, 1, 1, 1.25, 1.15, 1, 1, .85, 1, 1, 1, 1.1],
    bees: [1.3, 1, 1, 1.4, 1, 1.5, .5, 3, 1.5, 1, .25, 1, 1],
    carrier: [1.5, 1, 1, 1, 1, .8, 1, 1.3, 1.2, 1.2, 1, 1, 1],
    hexatrap: [1.3, 1, 1.25, 1, 1, 1, 1, .8, 1, .5, 1, 1, 1],
    block: [1.1, 2, .1, 1.5, 2, 1, 1.25, 1.5, 2.5, 1.25, 1, 1, 1.25],
    construct: [1.3, 1, 1, .9, 1, 1, 1, 1, 1.1, 1, 1, 1, 1],
    boomerang: [.8, 1, 1, 1, .5, .5, 1, .75, .75, 1.333, 1, 1, 1],
    over: [1.25, 1, 1, .85, .7, .8, 1, 1, .9, 1, 2, 1, 1],
    meta: [1.333, 1, 1, 1, 1, .667, 1, 1, 1, 1, 1, 1, 1],
    overdrive: [5, 1, 1, 1, .8, .8, .8, .9, .9, .9, 1, 1.2, 1],
    weak: [2, 1, 1, 1, .6, .6, .8, .5, .7, .25, .3, 1, 1],
    master: [3, 1, 1, .7, .4, .7, 1, 1, 1, .1, .5, 1, 1],
    sunchip: [5, 1, 1, 1.4, .5, .4, .6, 1, 1, 1, .8, 1, 1],
    pentachip: [5, 1, 1, 1.4, 1.5, 1.4, 1.1125, 1, 1, 1, .8, 1, 1],
    male: [.5, 1, 1, 1.05, 1.15, 1.15, 1.15, .8, .8, 1, 1.15, 1, 1],
    babyfactory: [1.5, 1, 1, 1, 1, 1, 1, 1, 1.35, 1, 1, 1, 1],
    lowpower: [1, 1, 2, 1, .5, .5, .7, 1, 1, 1, 1, .5, .7],
    halfrecoil: [1, .5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    morerecoil: [1, 1.15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    muchmorerecoil: [1, 1.35, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    lotsmorrecoil: [1, 1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    tonsmorrecoil: [1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    doublerecoil: [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    doublereload: [.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    morereload: [.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    halfreload: [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    lessreload: [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    threequartersrof: [1.333, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    morespeed: [1, 1, 1, 1, 1, 1, 1, 1.3, 1.3, 1, 1, 1, 1],
    bitlessspeed: [1, 1, 1, 1, 1, 1, 1, .93, .93, 1, 1, 1, 1],
    slow: [1, 1, 1, 1, 1, 1, 1, .7, .7, 1, 1, 1, 1],
    halfspeed: [1, 1, 1, 1, 1, 1, 1, .5, .5, 1, 1, 1, 1],
    thirdreload: [0.3, 1, 1, 1, 1, 1, 1, 1, .5, 1, 1, 1, 1],
    notdense: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, .1, 1, 1],
    halfrange: [1, 1, 1, 1, 1, 1, 1, 1, 1, .5, 1, 1, 1],
    fake: [1, 1, 1, 1e-5, 1e-4, 1, 1, 1e-5, 2, 0, 1, 1, 1],
    healer: [1, 1, 1, 1, 1, -100, 1, 1, 1, 1, 1, 1, 1],
    op: [.5, 1.3, 1, 1, 4, 4, 4, 3, 2, 6, 5, 1, 1],
    protectorswarm: [5, 1e-6, 1, 1, 100, 1, 1, 1, 1, .5, 5, 1, 10],
    summoner: [.3, 1, 1, 1.125, .4, .345, .4, 1, 1, 1, .8, 1, 1],
    nest_keeper: [3, 1, 1, .75, 1.05, 1.05, 1.1, .5, .5, .5, 1.1, 1, 1],
    more_speed: [1, 1, 1, 1, 1, 1, 1, 1.3, 1.3, 1, 1, 1, 1],
    one_third_reload: [1.333, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    arrasmayhem: [.1, 1.4, .1, 1, 2, .2, 1, 4.5, 1, 1, 1, 15, 1],
    testbedbullet: [.5, 1.3, 1, 1, 10, 10, 10, 3, 2, 6, 5, 1, 1],
    redistributor: [60, 7.5, 0.1, 0.5, 8, 8, 9, 1.35, 1, 1.25, 1, 0.1, 2],
    sandman: [16, 6, 0.1, 0.5, 9e99, 9e99, 9e99, 1.3, 1, 1.25, 1, 0.1, 2],
    poi_son: [1, 1.4, 0.1, 1, 99, 0.001, 1, 4.5, 1, 1, 1, 0.1, 1],
    nuclearBomb: [1.75, 1, 1, 1, 1.2, 1.2, 1.2, 1, 1, 1.2, 1, 1, 1],
    ceptionistbullet: [18.25, 1.4, .1, .3, 2, .2, 1, 4.5, 1, 1, 1, 15, 1],
    twist:      [1,     1,     1,      0.75,   1,      1,      1,      1,      1,      1,      1,      1,      1],   
  
    halfsize:           [1,     1,     1,      0.5,    1,      1,      1,      1,      1,      1,      1,      1,      1], 
  
    octoblock:          [6,     1,     1,      1,      1,      0.5,      1,      4,      1,      0.4,    1,      1,      1], 
  
    omega:              [0.2,   1,     1,      2,      1,      1,      1,      3,      1,      3,      1,      1,      1],
  
    weiner:             [1,     1,     1,      999999,   0.1,    9999999999999,0.001,  0.01,   1,      0.01,   1,      1,      1],
  
    explosivetrap:      [6,     0.3,     1,      1,      1,      0.8,      1,      1,      1,      0.3,   100,    1,      10],
  
    dronedestroy:       [1,     1.8,   0.5,    1,      2,      2,      1.2,    0.90,   0.5,    1,      2,      1,      3],
    charge:             [5,    1.4,   0.1,    1,      1,      0.75,   1,      -4.5,    1,   0.1,      1,      180,     1], 
  
  morerange:            [1,     1,     1,      1,      1,      1,      1,      1,      1,      2,      1,      1,      1], 
                        // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
  lance:                [1,     0,             0.01,                8,    1,     0.1,        3,        1,      0,        0.2,      2,            0.001,              1],  
  
  lancereal:           [0.085, 0, 1, 1, 0.05, 17.575, 1.777, 0.088, 1, 0.05, 1, 12, 1],
  
  morehealth:           [1,     1,     1,      1,      2,      1,      2,      1,      1,      1,      1,      1,      1], 
  
  lesshealth:           [1,     1,     1,      1,      0.5,      1,      2,      1,      1,      1,      1,      1,      1], 
  
  moredamge:            [1,     1,     1,      1,      1,      2,      1,      1,      1,      1,      1,      1,      1], 
  
  damage4health:            [1,     1,     1,      1,      0.5,      2,      1,      1,      1,      1,      1,      1,      1], 
  
  health4damage:            [1,     1,     1,      1,      2,      0.5,      1,      1,      1,      1,      1,      1,      1], 
  
  lessspeed:            [1,     1,     1,      1,      1,      1,      1,      0.6,    0.6,    1,      1,      1,      1],
  // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
  
  vacuum: [2, 0, 1, 1.2, 999999, 0, 999999, 10, 10, 0.08, 10, 1, 1],
  vacuumRecoil: [2.2, 0.85, 1, 1.2, 999999, 0, 999999, 10, 10, 0.08, 10, 1, 1],
  
  archer:               [      0.1,   0.5,             1,                1,    1.5,   0.03,       5,        2,        2,      0.25,        1,        1,                      1], 
  
  norecoil:             [1,     0,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
  
  flare:             [1,     1,   1,      1,      0.7,      1,      1,      1,      1,      1,      1,      1,      1], 
  
  debugnofire:             [99999999,     1,   1,      0,      0,      0,      0,      0,      0,      0,      1,      1,      1], 
  
  noshudder:  [1, 1, 0.01, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  halfhealth:  [1, 1, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1],
  whatthe: [0.03703703703, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  
  deflector: [0.01, 0, 1, 0.7, 9999, 0, 0, 0.01, 0.01, 0.04, 1, 1, 1],
  
  minionswarmer: [0.4, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 1],
  
  halfstats: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
  halfnerf: [2, 1, 1, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 2, 1, 1, 1],
  clonerbuff: [0.7, 1, 1, 1, 0.8, 0.7, 2, 2, 2, 1, 1, 1, 1],
  
  blackhole: [1, 1, 1, 1, 0.7, 0.8, 1, 1, 1, 1, 1, 1, 1],
  
};

const dfltskl = 9;

// NAMES
const statnames = {
    smasher: 1,
    drone: 2,
    necro: 3,
    swarm: 4,
    trap: 5,
    generic: 6,
    lance: 7,
    deflector: 8,
};
const gunCalcNames = {
    default: 0,
    bullet: 1,
    drone: 2,
    swarm: 3,
    fixedReload: 4,
    thruster: 5,
    sustained: 6,
    necro: 7,
    trap: 8,
    lance: 9,
};

// ENTITY DEFINITIONS
exports.genericEntity = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,    
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],    
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    SHOOT_ON_DEATH: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 0,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,
        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2,
    },    
    FOOD: {
        LEVEL: -1,
    },
};
const basePolygonDamage = 1;
const basePolygonHealth = 2;
// FOOD
exports.food = {
    TYPE: "food",
    DAMAGE_CLASS: 1,
    HITS_OWN_TYPE: "repel",
    MOTION_TYPE: "drift",
    FACING_TYPE: "turnWithSpeed",
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1
    },
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false
};
exports.icositrigon = {
  PARENT: [exports.food],
  FOOD:  {
    LEVEL: 10
  },
  LABEL: 'Icositrigon',
  POLYLEVEL: 17,
  SHAPE: 23,
  SIZE: 73,
  COLOR: 5
};
exports.diamond = {
  PARENT: [exports.food],
  FOOD:  {
    LEVEL: 7
  },
  LABEL: 'Diamond',
  POLYLEVEL: 20,
  SHAPE: 8,
  SIZE: 12,
  COLOR: 38,
};
exports.diamondicosagon = {
  PARENT: [exports.food],
  FOOD: {
    LEVEL: 5
  },
  LABEL: 'Diamond Icosagon',
  POLYLVL: 15,
  SHAPE: 20,
  SIZE: 64,
  COLOR: 21,
  BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 15000 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: .6
    },
  DRAW_HEALTH: true,
  GIVE_KILL_MESSAGE: true
};
exports.goldenicosagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5
    },
    LABEL: "Golden Icosagon",
    POLYLVL: 13,
    SHAPE: 20,
    SIZE: 64,
    COLOR: 13,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 10000 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: .6
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.dodecagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5
    },
    LABEL: "Dodecagon",
    POLYLVL: 11,
    SHAPE: 12,
    SIZE: 64,
    COLOR: 19,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 2400 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: .6
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.hendecagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5
    },
    LABEL: "Hendecagon",
    POLYLVL: 10,
    SHAPE: 11,
    SIZE: 64,
    COLOR: 19,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 2000 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: .6
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.decagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5
    },
    LABEL: "Decagon",
    POLYLVL: 9,
    SHAPE: 10,
    SIZE: 64,
    COLOR: 42,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 1600 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: .6
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.nonagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5
    },
    LABEL: "Nonagon",
    POLYLVL: 8,
    SHAPE: 9,
    SIZE: 64,
    COLOR: 13,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 1200 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: .6
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.galaPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5
    },
    LABEL: "Galactic Octagon",
    POLYLVL: 7,
    VALUE: 15e4,
    SHAPE: 8,
    SIZE: 64,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 800 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: .6
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.alphaPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5
    },
    LABEL: "Alpha Heptagon",
    POLYLVL: 6,
    VALUE: 15e3,
    SHAPE: 7,
    SIZE: 58,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: .6
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.bigPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 4
    },
    LABEL: "Beta Hexagon",
    POLYLVL: 5,
    VALUE: 2500,
    SHAPE: 6,
    SIZE: 30,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 50 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        SHIELD: 20 * basePolygonHealth,
        REGEN: .2
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.pentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 3
    },
    LABEL: "Pentagon",
    POLYLVL: 4,
    VALUE: 400,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1
    },
    DRAW_HEALTH: true
};
exports.triangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 2
    },
    LABEL: "Triangle",
    POLYLVL: 3,
    VALUE: 120,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 2,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5
    },
    DRAW_HEALTH: true
};
exports.square = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1
    },
    LABEL: "Square",
    POLYLVL: 2,
    VALUE: 30,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false
}; 
exports.egg = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0
    },
    LABEL: "Egg",
    VALUE: 10,
    SHAPE: 0,
    SIZE: 5,
    COLOR: 6,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: .0011,
        PUSHABILITY: 0
    },
    DRAW_HEALTH: false
};
exports.greenhugepentagon = {
    PARENT: [exports.food],
    LABEL: "Shiny Alpha Pentagon",
    GIVE_KILL_MESSAGE: true,
    VALUE: 23040000,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 20000,
        RESIST: 1.25,
        PENETRATION: 1.1
    },
    DRAW_HEALTH: true,
    FOOD: {
        LEVEL: 6
    }
};
exports.greenbetapentagon = {
    PARENT: [exports.food],
    LABEL: "Shiny Beta Pentagon",
    GIVE_KILL_MESSAGE: true,
    VALUE: 4800000,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 2000,
        RESIST: 1.25,
        PENETRATION: 1.1
    },
    DRAW_HEALTH: true,
    FOOD: {
        LEVEL: 6
    }
};
exports.greenpentagon = {
    PARENT: [exports.food],
    LABEL: "Shiny Pentagon",
    GIVE_KILL_MESSAGE: true,
    VALUE: 800000,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 200,
        RESIST: 1.25,
        PENETRATION: 1.1
    },
    DRAW_HEALTH: true,
    FOOD: {
        LEVEL: 6
    }
};
exports.greentriangle = {
    PARENT: [exports.food],
    LABEL: "Shiny Triangle",
    GIVE_KILL_MESSAGE: true,
    VALUE: 200000,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 1,
    BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 60,
        RESIST: 1.15,
        PENETRATION: 1.5
    },
    DRAW_HEALTH: true,
    FOOD: {
        LEVEL: 6
    }
};
exports.greensquare = {
    PARENT: [exports.food],
    LABEL: "Shiny Square",
    GIVE_KILL_MESSAGE: true,
    VALUE: 50000,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 1,
    BODY: {
        DAMAGE: .5,
        DENSITY: 4,
        HEALTH: 20,
        PENETRATION: 2
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    FOOD: {
        LEVEL: 6
    }
};
exports.gem = {
    PARENT: [exports.food],
    LABEL: "Gem",
    GIVE_KILL_MESSAGE: true,
    VALUE: 25000,
    SHAPE: 6,
    SIZE: 5,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage / 4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: .25
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    FOOD: {
        LEVEL: 6
    }
};
exports.legendarySquare = {
    PARENT: [exports.food],
    LABEL: "Legendary Square",
    GIVE_KILL_MESSAGE: true,
    VALUE: 2304000000,
    SHAPES: 4,
    SIZE: 12,
    COLOR: 0,
    BODY: {
        DAMAGE: 0.5,
        DENSITY: 4,
        HEALTH: 8,
        PENETRATION: 2,
        RESIST: 4,
        PUSHABLITY: .25
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    FOOD: {
        LEVEL: 6
    }
};
exports.crystal = {
   PARENT: [exports.food],
   LABEL: 'Crystal',
   GIVE_KILL_MESSAGE: true,
   VALUE: 500000,
   SHAPE: 6,
   SIZE: 9,
   COLOR: 36,
   BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 100,
        RESIST: 1.15,
        PENETRATION: 1.5
   },
   DRAW_HEALTH: true,
   FOOD: {
        LEVEL: 6
   }
};
exports.obstacle = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -9,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 8,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
    exports.babyObstacle = {
        PARENT: [exports.obstacle],
        SIZE: 25,
        SHAPE: -7,
        LABEL: "Gravel",
    };

// WEAPONS
const wepHealthFactor = 0.5;
const wepDamageFactor = 1.5;
exports.bullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.arrasmayhembullet = {
    LABEL: 'OP BULLET IG', // i forgor :skull:
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.ceptionistbullet = {
    PARENT: [exports.bullet],
     BODY: {
         PENETRATION: 1,
         SPEED: 3.75,
         RANGE: 90,
         DENSITY: 1.25,
         HEALTH: 0.165,
         DAMAGE: 6,
         PUSHABILITY: 0.3,
     },
     // Sasn
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  8,     3,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.ceptionistbullet]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: true,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
            SKIN: 0,                    // def
            // COLOR_OVERRIDE: 6        // def
        }, }, 
    ],
     CAN_GO_OUTSIDE_ROOM: true,
     HITS_OWN_TYPE: 'never',
     DIE_AT_RANGE: true,
}
exports.lrbullet = {
  PARENT: [exports.bullet],
  LAYER: 12,
}
    exports.casing = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
    };

exports.swarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
    exports.bee = {
        PARENT: [exports.swarm],
        PERSISTS_AFTER_DEATH: true, 
        SHAPE: 4, 
        LABEL: 'Drone',
        HITS_OWN_TYPE: 'hardWithBuffer',
    };
    exports.autoswarm = {
        PARENT: [exports.swarm],
        AI: { FARMER: true, },
        INDEPENDENT: true,
    };
exports.autobee = {
        PARENT: [exports.autoswarm],
        PERSISTS_AFTER_DEATH: true, 
        SHAPE: 4, 
        LABEL: 'Drone',
        HITS_OWN_TYPE: 'hardWithBuffer',
    };
exports.trap = {
    LABEL: 'Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3, 
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
};
    exports.block = {
        LABEL: 'Block',
        PARENT: [exports.trap],
        SHAPE: -4,
        MOTION_TYPE: 'motor',    
        CONTROLLERS: ['goToMasterTarget'],
        BODY: {
            SPEED: 1,
            DENSITY: 5,
        },
    };
    exports.boomerang = {
        LABEL: 'Boomerang',
        PARENT: [exports.trap],
        CONTROLLERS: ['boomerang'],
        MOTION_TYPE: 'motor',  
        HITS_OWN_TYPE: 'never',
        SHAPE: -5,
        BODY: {
            SPEED: 1.25,
            RANGE: 120,
        },
    };

exports.drone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};

exports.cutterdrone = {
  PARENT: [exports.drone],
  SHAPE: -4,
  DRAW_HEALTH: true,
  DIPMULTI: 0,
  FACING_TYPE: 'cutter'
}
    exports.paladindrone = {
      PARENT: [exports.drone],
      SHAPE: 5,
      INDEPENDENT: true,
      BODY: {
        SPEED: 1.35,
        HEALTH: 3,
      },
      DRAW_HEALTH: true
    }
    exports.sunchip = {
        PARENT: [exports.drone],
        SHAPE: 4,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
    exports.pentachip = {
      PARENT: [exports.sunchip],
      SHAPE: 5,
      BODY: {
        SPEED: 1.4
      }
    }
    exports.hexachip = {
      PARENT: [exports.sunchip],
      SHAPE: 6,
      BODY: {
        SPEED: 1.4
      }
    }
    exports.autosunchip = {
        PARENT: [exports.sunchip],
        AI: {
            BLIND: true,
            FARMER: true,
        },
        INDEPENDENT: true,
    };
    exports.invissunchip = {
        PARENT: [exports.sunchip],
        INVISIBLE: [0.08, 0.03],
    };
    exports.gunchip = {
        PARENT: [exports.drone],
        SHAPE: -2,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };

exports.missile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     -2,     130,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,      2,     230,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, 
    ],
};
exports.twistmissile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    FACING_TYPE: 'turnWithSpeed',
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     0,      90,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,     0,     270,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, },
    ],
};
    exports.hypermissile = {
        PARENT: [exports.missile],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     6,      1,      0,     -2,     150,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     210,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {        
            POSITION: [  14,     6,      1,      0,     -2,      90,    0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     270,    0.5,  ],  
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.snake = {
        PARENT: [exports.bullet],
        LABEL: 'Snake',
        INDEPENDENT: true,
        BODY: {
            RANGE: 120,
        },  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,    12,     1.4,     8,      0,     180,    0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake, g.snakeskin,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  10,    12,     0.8,     8,      0,     180,   0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    NEGATIVE_RECOIL: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.hive = {
        PARENT: [exports.bullet],
        LABEL: 'Hive',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      108,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      180,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      252,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      324,    0.6,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      36,     0.8,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, 
        ],
    };

// TANK CLASSES
const base = {
    ACCEL: 1.6,
    SPEED: 5.25,
    HEALTH: 20,
    DAMAGE: 3,
    RESIST: 1,
    PENETRATION: 1.05,
    SHIELD: 8,
    REGEN: 0.025,
    FOV: 1,
    DENSITY: 0.5,
};
exports.genericTank = {
    LABEL: 'Unknown Class',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    DANGER: 5,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    HITS_OWN_TYPE: 'hardOnlyTanks',
    SIZE: 12,
    MAX_CHILDREN: 0,   
    DAMAGE_EFFECTS: false,
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH, 
        DAMAGE: base.DAMAGE, 
        PENETRATION: base.PENETRATION, 
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
};
exports.genericTri = {
  LABEL: 'Unknown Class',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    DANGER: 5,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    HITS_OWN_TYPE: 'hardOnlyTanks',
    SIZE: 12,
    MAX_CHILDREN: 0,   
    DAMAGE_EFFECTS: false,
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH, 
        DAMAGE: base.DAMAGE, 
        PENETRATION: base.PENETRATION, 
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
  SHAPE: [[-1,0],[0.75,-1],[0.75,1]]
}

let gun = { };

exports.autoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
                TYPE: exports.bullet,
            }, },
    ],
};
    exports.machineAutoTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,    11,     1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.mach, g.slow]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.autoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     6,      1,      0,      5,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {
            POSITION: [  20,     6,      1,      0,     -5,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };
    exports.oldAutoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     7,      1,      0,    -5.75,    0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {            
            POSITION: [  20,     7,      1,      0,     5.75,    0,     0.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };

exports.auto3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: exports.bullet,
            }, }
    ],
};
    exports.auto5gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    11,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.heavy3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
            SPEED: 0.9,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
exports.architectgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    16,      1,      0,      0,      0,      0,   ], 
        }, {
        POSITION: [   2,    16,     1.1,     20,     0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
                TYPE: exports.block,
            }, },
    ],
};
    exports.masterGun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 16,
        MAX_CHILDREN: 6,
        AI: {
            NO_LEAD: true,
            SKYNET: true,
            FULL_VIEW: true,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   8,     14,    1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.master]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.bansheegun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  26,    10,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.lessreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.auto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     4,      1,      0,    -3.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     3.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.bigauto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     5,      1,      0,    -4.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
exports.smasherBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
exports.spikeBody = {
    LABEL: '',
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -4,
    INDEPENDENT: true,
};
    exports.spikeBody1 = {
        LABEL: '',
        CONTROLLERS: ['fastspin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
    exports.spikeBody2 = {
        LABEL: '',
        CONTROLLERS: ['reversespin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
exports.megasmashBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: -6,
    INDEPENDENT: true,
};
exports.dominationBody = {
    LABEL: '',
    CONTROLLERS: ['dontTurn'], 
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
};
    exports.baseSwarmTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        COLOR: 16,
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        AI: {
            NO_LEAD: true,
            LIKES_SHAPES: true,
        },
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   5,    4.5,    0.6,     7,      2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,          
                }, }, {
            POSITION: [   5,    4.5,    0.6,     7,     -2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   5,    4.5,    0.6,    7.5,     0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: [exports.swarm, { INDEPENDENT: true, AI: { LIKES_SHAPES: true, }, }, ],
                    STAT_CALCULATOR: gunCalcNames.swarm,  
            }, }
        ],
    };
    exports.baseGunTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        BODY: {
            FOV: 5,
        },
        ACCEPTS_SCORE: false,
        CONTROLLERS: ['nearestDifferentMaster'], 
        INDEPENDENT: true,
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  12,    12,     1,       6,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [  11,    13,     1,       6,      0,      0,     0.1,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [   7,    13,    -1.3,     6,      0,      0,      0,   ],
                }
        ],
    };
        exports.baseProtector = {
            PARENT: [exports.genericTank],
            LABEL: 'Base',
            SIZE: 64,
            DAMAGE_CLASS: 0,
            ACCEPTS_SCORE: false,
            SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 10000, 
                DAMAGE: 10, 
                PENETRATION: 0.25, 
                SHIELD: 1000,
                REGEN: 100,
                FOV: 1,
                PUSHABILITY: 0,
                HETERO: 0,
            },
            //CONTROLLERS: ['nearestDifferentMaster'],
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: exports.dominationBody,
                        }, {
                POSITION: [  12,     7,      0,      45,     100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     135,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     225,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     315,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        },
            ],
            GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     315,     0,   ], }, {
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     315,     0,   ], }, 
            ],
        };

exports.minion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.pillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.pillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pillboxTurret,
        }
    ]
};
exports.epillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pillboxTurret,
        }
    ]
};
exports.skimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 2,
    },
    COLOR: 2,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    LABEL: '',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                TYPE: exports.hypermissile,
            }, }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
            },
    ],
};
    exports.skimboss = {
        PARENT: [exports.genericTank],
        BODY: {
            HEALTH: 300,
            DAMAGE: 2,
            SHIELD: 200,
        },
        SHAPE: 3, 
        COLOR: 2,
        FACING_TYPE: 'autospin',
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  15,     5,      0,     60,     170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     180,    170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     300,    170, 0], 
                TYPE: exports.skimturret,
                    },
        ],
    };

function makeAuto(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurret, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeHybrid(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   7,     12,    1.2,     8,      0,     180,     0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true, }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,    
            MAX_CHILDREN: 3,
        }, };
    if (type.TURRETS != null) { output.TURRETS = type.TURRETS; }
    if (type.GUNS == null) { output.GUNS = [spawner]; }
    else { output.GUNS = [...type.GUNS, spawner]; }
    if (name == -1) { output.LABEL = 'Hybrid ' + type.LABEL; } else { output.LABEL = name; }
    return output;
}

// Tanks

exports.basic = {
    PARENT: [exports.genericTank],
    LABEL: 'Normal',
  //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
            SKIN: 0,                    // def
            // COLOR_OVERRIDE: 6        // def
        }, }, 
    ],
};
// Generators
exports.crystalgenerator = {
    PARENT: [exports.genericTank],
    LABEL: 'Crystal Generator',
    COLOR: 36,
  //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     10,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.crystal,
        }, }, 
    ],
};
exports.diamondicosagongenerator = {
    PARENT: [exports.genericTank],
    LABEL: 'Diamond Icosagon Generator',
    COLOR: 21,
  //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     60,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.diamondicosagon,
        }, }, 
    ],
};
// Testbed
exports.testbedpt = {
            PARENT: [exports.genericTank],
            LABEL: '',
            RESET_UPGRADES: true,
            SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            LEVEL: -1,
          SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
          INVISIBLE: [],
    BODY: {
        ACCELERATION: 1,
        SPEED: 10,
        HEALTH: 99999999999999999999,//needs Infinite health.
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 15,
        PENETRATION: 10,
        RANGE: 0,
        FOV: 2,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2,
    },    
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     120,    360,  0,], 
                    TYPE: exports.spikeBody,
                    }, {
                    POSITION: [ 20.5,    0,      0,     240,    360,  0,], 
                    TYPE: exports.spikeBody,
                }],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.testbedbullet, g.basic]),
                    TYPE: exports.bullet,
                }, }, 
            ],
        };
/* Testers */
// Beta Tester
exports.betatester = {
            PARENT: [exports.genericTank],
            LABEL: 'beta tester',
            RESET_UPGRADES: true,
            SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            LEVEL: -1,
          SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
          INVISIBLE: [],
    BODY: {
        ACCELERATION: 1,
        SPEED: 10,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 15,
        PENETRATION: 10,
        RANGE: 0,
        FOV: 2,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2,
    },    
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.op, g.basic]),
                    TYPE: exports.bullet,
                }, }, 
            ],
        };
// Beta Tester Stuff
exports.betatesterbosses = {
            PARENT: [exports.betatester],
            LABEL: 'Bosses',
        };
exports.betatestermisc = {
            PARENT: [exports.betatester],
            LABEL: 'Misc',
        };
exports.betatesteroptanks = {
            PARENT: [exports.betatester],
            LABEL: 'Op Tanks',
        };
// Senior Tester
exports.seniortester = {
            PARENT: [exports.genericTank],
            LABEL: 'Senior Tester',
            RESET_UPGRADES: true,
            SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            LEVEL: -1,
          SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
          INVISIBLE: [],
    BODY: {
        ACCELERATION: 1,
        SPEED: 10,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 15,
        PENETRATION: 10,
        RANGE: 0,
        FOV: 2,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2,
    },    
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.op, g.basic]),
                    TYPE: exports.bullet,
                }, }, 
            ],
        };
exports.seniortesterpt = {
            PARENT: [exports.genericTank],
            LABEL: 'Senior Tester',
            RESET_UPGRADES: true,
            SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            LEVEL: -1,
          SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
          INVISIBLE: [],
    BODY: {
        ACCELERATION: 1,
        SPEED: 10,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 15,
        PENETRATION: 10,
        RANGE: 0,
        FOV: 2,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2,
    },    
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.op, g.basic]),
                    TYPE: exports.bullet,
                }, }, 
            ],
        };
// Senior Tester Stuff
exports.seniortesterbosses = {
            PARENT: [exports.seniortesterpt],
            LABEL: 'Bosses',
        };
exports.seniortesterdominators = {
            PARENT: [exports.seniortesterpt],
            LABEL: 'dominators',
        };
exports.seniortestermisc = {
            PARENT: [exports.seniortesterpt],
            LABEL: 'Miscellananuous',
        };
        exports.testbed = {
            PARENT: [exports.testbedpt],
            LABEL: 'Developer',
        }; 
        exports.testbedtanks = {
            PARENT: [exports.betatester],
            LABEL: 'Beta Tanks',
        }; 
// Testbed Stuff
  exports.testbedpg2 = {
    PARENT: [exports.testbedpt],
    LABEL: 'Testbed Page 2',
};
exports.testbedpg3 = {
    PARENT: [exports.testbedpt],
    LABEL: 'Testbed Page 3',
};
        exports.bosses = {
            PARENT: [exports.testbedpt],
            LABEL: 'Bosses',
        }; 
        exports.bosses2 = {
            PARENT: [exports.testbedpt],
            LABEL: 'Page 2',
        }; 
      exports.misc = {
            PARENT: [exports.testbedpt],
            LABEL: 'Miscellanous',// in the console it says its undefined
        };
        exports.dominators = {
            PARENT: [exports.testbedpt],
            LABEL: 'Dominators'
        };
        exports.arenaclosers = {
            PARENT: [exports.testbedpt],
            LABEL: 'Arena Closers'
        };
        exports.optanks = {
            PARENT: [exports.testbedpt],
            LABEL: 'OP Tanks'
        };
        exports.polygongenerators = {
            PARENT: [exports.testbedpt],
            LABEL: 'Polygon Generators',
        }; 
exports.bossespg2 = {
    PARENT: [exports.testbedpt],
    LABEL: 'Bosses Page 2',
    CUSTOM: false,
    TURRETS: [],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
        }, 
    ],
};
exports.bossespg3 = {
    PARENT: [exports.testbedpt],
    LABEL: 'Bosses Page 3',
    CUSTOM: false,
    TURRETS: [],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ],
        }, 
    ],
};
// Rainbower
exports.rainbowtestbed = {
  PARENT: [exports.genericTank],
  LABEL: 'da rainbower',
  COLOR: 36
};
            exports.single = {
                PARENT: [exports.genericTank],
                LABEL: 'Single',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };  
        let smshskl = 12; //13;
        exports.smash = {
            PARENT: [exports.genericTank],
            LABEL: 'Smasher',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };


exports.landmine = {
    PARENT: [exports.genericTank],
    LABEL: 'Landmine',
    INVISIBLE: [0.06, 0.01],
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 1.1,
        FOV: base.FOV * 1.05,
        DENSITY: base.DENSITY * 2,
    },
    TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [21.5, 0, 0, 0, 360, 0, ],
        TYPE: exports.smasherBody,
    }, {
        POSITION: [21.5, 0, 0, 90, 360, 0, ],
        TYPE: exports.smasherBody,
    }],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl, ],
    STAT_NAMES: statnames.smasher,
};
            exports.megasmash = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega-Smasher',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed * 1.05,
                    FOV: base.FOV * 1.1,
                    DENSITY: base.DENSITY * 4,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  24,     0,      0,      0,     360,  0,], 
                    TYPE: exports.megasmashBody,
                }],
            };
            exports.spike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed*0.9,
                    DAMAGE: base.DAMAGE * 1.1,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 2,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     120,    360,  0,], 
                    TYPE: exports.spikeBody,
                    }, {
                    POSITION: [ 20.5,    0,      0,     240,    360,  0,], 
                    TYPE: exports.spikeBody,
                }],
            };     
            exports.weirdspike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    DAMAGE: base.DAMAGE * 1.15,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 1.5,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody1,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     180,    360,  0,], 
                    TYPE: exports.spikeBody2,
                }],
            };       
            exports.autosmash = makeAuto(exports.smash, 'Auto-Smasher', { type: exports.autoSmasherTurret, size: 11, });
            exports.autosmash.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl,];

    exports.twin = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };
        exports.gunner = {
            PARENT: [exports.genericTank],
            LABEL: 'Gunner',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.machinegunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Machine Gunner',
                DANGER: 6,
                BODY: {
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     3,     4.0,    -3,      5,      0,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     0,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, 
                ]
            };
            exports.autogunner = makeAuto(exports.gunner);            
            exports.nailgun = {
                PARENT: [exports.genericTank],
                LABEL: 'Nailgun',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     2,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],
                        },
                ],
            };

        exports.double = {
            PARENT: [exports.genericTank],
            LABEL: 'Double Twin',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.tripletwin = {
                PARENT: [exports.genericTank],
                LABEL: 'Triple Twin',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    120,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    240,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.autodouble = makeAuto(exports.double, 'Auto-Double');
            exports.split = {
                PARENT: [exports.genericTank],
                LABEL: 'Hewn Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     5.5,     25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,    -5.5,    -25,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };

        exports.bent = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Shot',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.bentdouble = {
                PARENT: [exports.genericTank],
                LABEL: 'Bent Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     -1,     -25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,      25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -1,     155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,    -155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.penta = {
                PARENT: [exports.genericTank],
                LABEL: 'Penta Shot',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.85,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      1,      0,     -3,    -30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      3,     30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.benthybrid = makeHybrid(exports.bent, 'Bent Hybrid');

        exports.triple = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
            },
            LABEL: 'Triplet',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,      1,      0,      5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    10,      1,      0,     -5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    10,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.quint = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Quintuplet',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,    10,      1,      0,     -5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    10,      1,      0,      5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,    10,      1,      0,     -3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  19,    10,      1,      0,      3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };        
            exports.dual = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    ACCEL: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Dual',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     7,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  18,     7,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  16,    8.5,     1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  16,    8.5,     1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };

    exports.sniper = {
        PARENT: [exports.genericTank],
        LABEL: 'Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, },
        ],
    };
            exports.rifle = {
                PARENT: [exports.genericTank],
                LABEL: 'Rifle',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.musket = {
                PARENT: [exports.genericTank],
                LABEL: 'Musket',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  14,    20,      1,      0,     0,      0,      0,   ], 
                        }, {
                    POSITION: [  18,    6.5,    1,      0,      4,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,    6.5,    1,      0,      -4,      0,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
        exports.assassin = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Assassin',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };
            exports.ranger = {
                PARENT: [exports.genericTank],
                LABEL: 'Ranger',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  32,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                    },
                ],
            };
            exports.autoass = makeAuto(exports.assassin);

        exports.hunter = {
            PARENT: [exports.genericTank],
            LABEL: 'Hunter',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    12,      1,      0,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.preda = {
                PARENT: [exports.genericTank],
                LABEL: 'Predator',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,    12,      1,      0,      0,      0,     0.15, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  18,    16,      1,      0,      0,      0,     0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.poach = makeHybrid(exports.hunter, 'Poacher');
            exports.sidewind = {
                PARENT: [exports.genericTank],
                LABEL: 'Sidewinder',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    11,    -0.5,    14,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  21,    12,    -1.1,     0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind]),
                            TYPE: exports.snake,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

    exports.director = {
        PARENT: [exports.genericTank],
        LABEL: 'Director',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    // Arras.io big cheese
    exports.bigcheese = {
      PARENT: [exports.genericTank],
      LABEL: 'Big Cheese',
      GUNS: [
        {
          POSITION: [15, 16, 1.2, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.double_damage, [1,1,1,1.4,1,1,1,1,1,1,1,1,1]]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            MAX_CHILDREN: 3
          }
        }
      ]
    }
            exports.master = {
                PARENT: [exports.genericTank],
                LABEL: '',  
                STAT_NAMES: statnames.drone,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.15,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  16,     1,      0,      0,      0, 0], 
                        TYPE: exports.masterGun,
                            }, {
                    POSITION: [  16,     1,      0,     120,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            }, {
                    POSITION: [  16,     1,      0,     240,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            },
                ],
            };

        exports.overseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Overseer',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            MAX_CHILDREN: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        };
exports.turreteddrone = makeAuto(exports.drone);
exports.drivesymbol = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 4
};
exports.drive = {
    PARENT: [exports.genericTank],
    LABEL: 'Overdrive',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 360, 1, ],
        TYPE: exports.drivesymbol,
    }],
    MAX_CHILDREN: 8,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.turreteddrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.turreteddrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },

    }, ],
};
            exports.overlord = {
                PARENT: [exports.genericTank],
                LABEL: 'Overlord',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
            };
            exports.overtrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Overtrapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.banshee = {
                PARENT: [exports.genericTank],
                LABEL: 'Banshee',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     8,      0,      0,      80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     120,     80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     240,     80, 0], 
                        TYPE: exports.bansheegun,
                            },
                ],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, 
                    ]
            };
            exports.autoover = makeAuto(exports.overseer, "Auto-seer");
            exports.overgunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Overgunner',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        },
                ],
            };
        
        function makeSwarmSpawner(guntype) {
            return {
                PARENT: [exports.genericTank],
                LABEL: '',
                BODY: {
                    FOV: 2,
                },
                CONTROLLERS: ['nearestDifferentMaster'], 
                COLOR: 16,
                AI: {
                    NO_LEAD: true,
                    SKYNET: true,
                    FULL_VIEW: true,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     15,    0.6,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: guntype,
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }
                ],
            };
        }
        exports.cruiserGun = makeSwarmSpawner(combineStats([g.swarm]));
        exports.cruiser = {
            PARENT: [exports.genericTank],
            LABEL: 'Cruiser',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    7.5,    0.6,     7,      4,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
            exports.battleship = {
                PARENT: [exports.genericTank],
                LABEL: 'Battleship',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      4,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     90,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',        
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      4,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',         
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, },
                ],
            };
            exports.carrier = {
                PARENT: [exports.genericTank],
                LABEL: 'Carrier',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      2,      40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -2,     -40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }
                ],
            };
            exports.autocruiser = makeAuto(exports.cruiser, "");
            exports.fortress = {
                PARENT: [exports.genericTank],
                LABEL: 'Fortress', //'Palisade',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     120,    1/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     240,    2/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [  14,     9,      1,      0,      0,     60,      0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     60,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     300,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

        exports.underseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Underseer',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            SHAPE: 4,
            MAX_CHILDREN: 14,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   5,     12,    1.2,     8,      0,     270,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
                ],
        };
        exports.maleficitor = {
            PARENT: [exports.genericTank],
            LABEL: 'Maleficitor',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            SHAPE: 4,
            MAX_CHILDREN: 14,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,     12,    1.2,     8,      0,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.invissunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
                ],
        };
            exports.necromancer = {
                PARENT: [exports.genericTank],
                LABEL: 'Necromancer',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 4,
                MAX_CHILDREN: 14,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, },
                    ],
            };
        exports.pentamancer = {
                PARENT: [exports.genericTank],
                LABEL: 'Pentamancer',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 5,
                MAX_CHILDREN: 14,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     (360 * 1.5) / 5,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pentachip]),
                            TYPE: exports.pentachip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     (360 * 2.5) / 5,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pentachip]),
                            TYPE: exports.pentachip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,      (360 * 3.5) / 5,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pentachip]),
                            TYPE: exports.pentachip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     (360 * 4.5) / 5,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pentachip]),
                            TYPE: exports.pentachip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                      POSITION: [   5,     12,    1.2,     8,      0,     (360 * 5.5) / 5,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pentachip]),
                            TYPE: exports.pentachip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }
                    ],
            };
            exports.hexamancer = {
                PARENT: [exports.genericTank],
                LABEL: 'Hexamancer',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 6,
                MAX_CHILDREN: 14,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     8,    1.2,     8,      0,     (360 * 1) / 6,      0   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pentachip, g.double_health, g.doublereload]),
                            TYPE: exports.hexachip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     8,    1.2,     8,      0,     (360 * 2) / 6,    0  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pentachip, g.double_health, g.doublereload]),
                            TYPE: exports.hexachip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     8,    1.2,     8,      0,      (360 * 3) / 6,     0 ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pentachip, g.double_health, g.doublereload]),
                            TYPE: exports.hexachip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     8,    1.2,     8,      0,     (360 * 4) / 6,    0  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pentachip, g.double_health, g.doublereload]),
                            TYPE: exports.hexachip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                      POSITION: [   5,   8,    1.2,     8,      0,     (360 * 5) / 6,    0  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pentachip, g.double_health, g.doublereload]),
                            TYPE: exports.hexachip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                      POSITION: [   5,   8,    1.2,     8,      0,     (360 * 6) / 6,    0  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pentachip, g.double_health, g.doublereload]),
                            TYPE: exports.hexachip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }
                    ],
            };
        exports.lilfact = {
            PARENT: [exports.genericTank],
            LABEL: 'Spawner',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  4.5,    10,      1,     10.5,    0,      0,      0,   ], 
                }, {
                POSITION: [   1,     12,      1,      15,     0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 4,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.minion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                    POSITION: [  3.5,    12,      1,      8,      0,      0,      0,   ], 
                }
            ],
        };
            exports.autolilfact = makeAuto(exports.lilfact);
            exports.factory = {
                PARENT: [exports.genericTank],
                LABEL: 'Factory',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: 1.1,
                },
                MAX_CHILDREN: 6,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.minion,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
                    }
                ],
            };
    exports.trapper ={
        PARENT: [exports.genericTank],
        LABEL: 'Trapper',
        GUN: [ {
           POSITION: [10, 7, 1, 0, 0, 0, 0,],
           PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap,
           }, },
        ],
    };
     exports.megatrapper = {
        PARENT: [exports.genericTank],
        LABEL: 'Mega Trapper',
        GUNS: [ {
           
          //deez hexagons
          POSITION: [10, 10, 1, 0, 0, 0, 0, 0]
        }, {
           POSITION: [4.5, 10, 12, 10, 0, 0, 0,],
           PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.trap, g.pound]),
               TYPE: exports.trap,
           }, },
        ],
    };
    exports.quadtrapper1 = {
        PARENT: [exports.genericTank],
        LABEL: 'Quad Trapper',
        GUN: [ {
           POSITION: [10, 7, 1, 0, 0, 0, 0,],
           PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap,
           }, },
          {
           POSITION: [10, 7, 1, 0, 0, 90, 0,],
           PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap,
           }, },
          {
           POSITION: [10, 7, 1, 0, 0, 180, 0,],
           PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap,
           }, },
          {
           POSITION: [10, 7, 1, 0, 0, 270, 0,],
           PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap,
           }, },
        ],
    };
   exports.barrier = {
        PARENT: [exports.genericTank],
        LABEL: 'Barrier',
        GUNS: [ {
          //deez hexagons
          POSITION: [14, 7, 1, 0, 0, 0, 0, 0]
        },{
           POSITION: [2.5, 7, 1.2, 14, 0, 0, 0,],
           PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap,
           }, },{
          //deez hexagons
          POSITION: [10, 7, 1, 0, 0, 0, 0, 0]
        },{
           POSITION: [2.5, 7, 1.2, 10, 0, 0, 0.5,],
           PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap,
           }, },
        ],
    };
    exports.barricade ={
        PARENT: [exports.genericTank],
        LABEL: 'Barricade',
        GUNS: [ {
          //deez hexagons
          POSITION: [10, 7, 1, 0, 0, 0, 0, 0]
        },{
           POSITION: [2.5, 7, 1.2, 10, 0, 0, 0,],
           PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap,
           }, },{
          //deez hexagons
          POSITION: [14, 7, 1, 0, 0, 0, 0, 0]
        },{
           POSITION: [2.5, 7, 1.2, 14, 0, 0, 0.25,],
           PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap,
           }, },{
          //deez hexagons
          POSITION: [18, 7, 1, 0, 0, 0, 0, 0]
        },{
           POSITION: [2.5, 7, 1.2, 18, 0, 0, 0.5,],
           PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap,
           }, },
        ],
    };
     exports.octotrapper ={
        PARENT: [exports.genericTank],
        LABEL: 'Octo-Trapper',
        GUN: (()=> {
          var gs = []
          for (let i = 0; i < 4; i++) {
            gs.push({ 
              POSITION: [10, 7, 1, 0, 0, (360 * i) / 4, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap
              }
            },{ 
              POSITION: [10, 7, 1, 0, 0, (360 * i) / 4 + 45, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap
              }
            })
          }
        })()
    };
exports.hexatrapper ={
        PARENT: [exports.genericTank],
        LABEL: 'Hexa-Trapper',
        GUN: [ {
           POSITION: [10, 7, 1, 0, 0, 120, 0,],
           PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap,
           }, },
          {
           POSITION: [10, 7, 1, 0, 0, 240, 0,],
           PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap,
           }, },
              {
           POSITION: [10, 7, 1, 0, 0, 0, 0,],
           PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap,
           }, },
              {
           POSITION: [10, 7, 1, 0, 0, 60, 0.5,],
           PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap,
           }, },
          {
           POSITION: [10, 7, 1, 0, 0, 180, 0.5,],
           PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap,
           }, },
              {
           POSITION: [10, 7, 1, 0, 0, -60, 0.5,],
           PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.trap]),
               TYPE: exports.trap,
           }, },
        ],
    };
    exports.machine = {
        PARENT: [exports.genericTank],
        LABEL: 'Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };
            exports.spray = {
                PARENT: [exports.genericTank],
                LABEL: 'Sprayer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
   
        exports.mini = {
            PARENT: [exports.genericTank],
            LABEL: 'Minigun',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.stream = {
                PARENT: [exports.genericTank],
                LABEL: 'Streamliner',
                DANGER: 7,
                BODY: {
                    FOV: 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  25,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.hybridmini = makeHybrid(exports.mini, "Crop Duster");
            exports.minitrap = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                LABEL: 'Barricade',
                STAT_NAMES: statnames.trap,
                BODY: {
                    FOV: 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [  24,     8,      1,      0,      0,      0,      0, ], 
                            }, {
                    POSITION: [   4,     8,     1.3,     22,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     18,     0,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     14,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
    
    exports.pound = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Pounder',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, },
        ],
    };
        exports.destroy = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Destroyer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, },
            ],
        };

            exports.anni = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Annihilator',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20,     20,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
            exports.damager = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.45,
        },
        LABEL: 'Redistrubuter (beta)',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.strongbullet]),
                TYPE: exports.bullet,
            }, },
        ],
    };
            exports.hiveshooter = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.speed * 0.8,
                },
                LABEL: 'Swarmer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.hive,
                        }, }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                    }
                ],
            };
            exports.hybrid = makeHybrid(exports.destroy, 'Hybrid');
            exports.shotgun2 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Shotgun',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                },
                GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                    POSITION: [  4,      3,      1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [ 15,     14,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  8,     14,    -1.3,    4,       0,      0,      0,   ], }
                ],
            };

        exports.builder = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Builder',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.block,
                    }, },
            ],
        };
            exports.architect = {
                PARENT: [exports.genericTank],
                LABEL: 'Architect',
                BODY: {
                    SPEED: base.SPEED * 1.1,
                },
                DANGER: 6,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     8,      0,      0,     190, 0], 
                        TYPE: exports.architectgun,
                            }, {
                    POSITION: [  12,     8,      0,     120,    190, 0], 
                        TYPE: exports.architectgun,
                            }, {
                    POSITION: [  12,     8,      0,     240,    190, 0], 
                        TYPE: exports.architectgun,
                            },
                ],
            };
            exports.engineer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Engineer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 6,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.pillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
            exports.construct = {
                PARENT: [exports.genericTank],
                LABEL: 'Constructor',
                STAT_NAMES: statnames.trap,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.7,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    18,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    18,     1.2,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                            TYPE: exports.block,
                        }, }, 
                ],
            };
            exports.autobuilder = makeAuto(exports.builder);
            exports.conq = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Conqueror',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  21,    14,      1,      0,      0,     180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  18,    14,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.1,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.block,
                        }, },
                ],
            };
            exports.boomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Boomer',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
            exports.quadtrapper = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: '',
                STAT_NAMES: statnames.trap, 
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     6,      1,      0,      0,     45,      0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     45,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     135,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     135,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     225,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     225,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     315,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     315,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, },
                ],
            };

        exports.artillery = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Artillery',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
            exports.mortar = {
                PARENT: [exports.genericTank],
                LABEL: 'Mortar',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     3,      1,      0,     -8,     -7,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,     3,      1,      0,      8,      7,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,     -6,     -7,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,      6,      7,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                            TYPE: exports.bullet,
                            LABEL: 'Heavy',
                        }, },
                ],
            };
            exports.skimmer = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Skimmer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.missile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
            exports.twister = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Twister',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    10.5,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,     0.75,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.twist]),
                            TYPE: exports.twistmissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
            exports.spread = {
                PARENT: [exports.genericTank],
                LABEL: 'Spreadshot',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     4,      1,      0,    -0.8,    -75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,    -1.0,    -60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,    -1.6,    -45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,    -2.4,    -30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,    -3.0,    -15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {                    
                    POSITION: [  13,     4,      1,      0,     0.8,     75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,     1.0,     60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,     1.6,     45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,     2.4,     30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,     3.0,     15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  13,    10,     1.3,     8,      0,      0,      0,     ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Pounder',
                        }, },
                ],
            };

    exports.flank = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank Guard',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
        exports.hexa = {
            PARENT: [exports.genericTank],
            LABEL: 'Hexa Tank',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.octo = {
                PARENT: [exports.genericTank],
                LABEL: 'Octo Tank',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      45,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     135,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     225,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     315,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
exports.hurricane = {
    PARENT: [exports.genericTank],
    LABEL: 'Cyclone',
    DANGER: 7,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [15, 3.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 30, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 60, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 90, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 150, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 180, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 210, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 240, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 270, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 300, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 330, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, ],
};
            exports.septatrap = (() => {
                let a = 360/7, d = 1/7;
                return {
                    PARENT: [exports.genericTank],
                    LABEL: 'Septa-Trapper',
                    DANGER: 7,
                    BODY: {
                        SPEED: base.SPEED * 0.8,
                    },
                    STAT_NAMES: statnames.trap,
                    HAS_NO_RECOIL: true,
                    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,      a,     4*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      a,     4*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     2*a,    1*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     2*a,    1*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     3*a,    5*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     3*a,    5*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     4*a,    2*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     4*a,    2*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     5*a,    6*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     5*a,    6*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     6*a,    3*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     6*a,    3*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, },
                    ],
                };
            })();
            exports.hexatrap = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Hexa-Trapper',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     60,     0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     60,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     120,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     180,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     240,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     300,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     300,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            }, 'Hexa-Trapper');

            exports.tritrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Tri-Trapper',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     120,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     240,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap,
                        }, },
                ],
            };
            exports.trapper = {
                PARENT: [exports.genericTank],
                LABEL: 'Trapper',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                  ],
            };
        exports.tri = {
            PARENT: [exports.genericTank],
            LABEL: 'Tri-Angle',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        }; 
            exports.booster = {
                PARENT: [exports.genericTank],
                LABEL: 'Booster',
                BODY: {
                    HEALTH: base.HEALTH * 0.4,
                    SHIELD: base.SHIELD * 0.4,
                    DENSITY: base.DENSITY * 0.3,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     140,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     220,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.fighter = {
                PARENT: [exports.genericTank],
                LABEL: 'Fighter',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.brutalizer = {
                PARENT: [exports.genericTank],
                LABEL: 'Surfer',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,         
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,      1,     -90,     9,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,     
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.bomber = {
                PARENT: [exports.genericTank],
                LABEL: 'Bomber',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     130,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     230,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.morerecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };    
            exports.autotri = makeAuto(exports.tri);   
            exports.autotri.BODY = {
                SPEED: base.SPEED,
            };   
            exports.falcon = {
                PARENT: [exports.genericTank],
                LABEL: 'Falcon',
                DANGER: 7,
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Assassin',
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [   5,    8.5,   -1.6,     8,      0,      0,      0,   ], 
                        }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.eagle = {
                PARENT: [exports.genericTank],
                LABEL: 'Eagle',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
                LABEL: 'Pounder',
                ALT_FIRE: true,
            }, },{   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
        exports.auto3 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.auto3gun,
                        },
            ],
        };
            exports.auto5 = {
                PARENT: [exports.genericTank],
                LABEL: 'Auto-5',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     8,      0,      0,     190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,      72,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     144,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     216,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     288,    190, 0], 
                        TYPE: exports.auto5gun,
                            },
                ],
            };
            exports.heavy3 = {
                BODY: {
                    SPEED: base.SPEED * 0.95,
                },
                PARENT: [exports.genericTank],
                LABEL: 'Mega-3',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  14,     8,      0,      0,     190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     120,    190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     240,    190, 0], 
                        TYPE: exports.heavy3gun,
                            },
                ],
            };
            exports.auto4 = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Auto-4',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,      45,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     135,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     225,    160, 0],
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     315,    160, 0],
                        TYPE: exports.auto4gun,
                            },
                ],
            };
        exports.volcano = {
          PARENT: [exports.genericTank],
          LABEL: 'Volcano',
          GUNS: [ {
              POSITION: [20, 9, 1, 0, -5.5, 0, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.flank, g.doublereload, g.spam]),
                TYPE: exports.bullet
              }
            }, {
              POSITION: [20, 9, 1, 0, 5.5, 0, 0.5],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.flank, g.doublereload, g.spam]),
                TYPE: exports.bullet
              }
            }
          ]
        }
        exports.sentinel = {
          PARENT: [exports.genericTank],
          LABEL: 'Sentinel',
          GUNS: [ {
              POSITION: [20, 10, 1, 0, -6.5, 0, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.flank, g.doublereload, g.halfrecoil, g.spam]),
                TYPE: exports.bullet
              }
            }, {
              POSITION: [20, 10, 1, 0, 6.5, 0, 0.5],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.flank, g.doublereload, g.halfrecoil, g.spam]),
                TYPE: exports.bullet
              }
            }, {
              POSITION: [6, 23, 1, 0, 0, 0, 0]
            },
          ]
        }
        exports.flanktrap = {
            PARENT: [exports.genericTank],
            LABEL: 'Trap Guard',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };
    exports.bulwark = {
        PARENT: [exports.genericTank],
        LABEL: 'Bulwark',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
                POSITION: [  10,     8,      1,      0,      5.5,     190,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    10,      5.5,     190,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                POSITION: [  10,     8,      1,      0,      -5.5,     170,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    10,      -5.5,     170,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
        ],
    };
            exports.guntrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Gunner Trapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    FOV: base.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [  13,    11,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    11,     1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.halfrecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.bushwhack = {
                PARENT: [exports.genericTank],
                LABEL: 'Bushwhacker',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,    8.5,     1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    8.5,    1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
exports.stalker = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Stalker',
    INVISIBLE: [0.08, 0.03],
    BODY: {
        ACCELERATION: base.ACCEL * 0.55,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.35,
    },
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [27, 8.5, -2, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
            TYPE: exports.bullet,
        },
    }],
};
exports.manager = {
    PARENT: [exports.genericTank],
    LABEL: 'Manager',
    STAT_NAMES: statnames.drone,
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    INVISIBLE: [0.06, 0.01],
    MAX_CHILDREN: 5,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
        },
    }, ],
};
exports.cutspwn = {
    PARENT: [exports.genericTank],
    LABEL: 'Cutter Spawner',
    STAT_NAMES: statnames.drone,
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    MAX_CHILDREN: 1,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.8, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.buffed]),
            TYPE: exports.cutterdrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
        },
    }, ],
};
// NPCS:
exports.crasher = {
    TYPE: 'crasher',
    LABEL: 'Crasher',
    COLOR: 5,
    SHAPE: 3,
    SIZE: 5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.smasher = {
    LABEL: 'Crasher',
    COLOR: 5,
    SHAPE: 0,
    DIPMULTI: 0.6,
    SIZE: 75,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 1094,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hardOnlyTanks',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    FOLLOW_PLAYER: true,
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  22.5,   0,      0,      0,     360,  0,], 
        TYPE: [exports.smasherBody2 = {
          COLOR: 19,
          CONTROLLERS: ['reversespin'],
          SHAPE: -8,
          DIP_MULTI: -1.6
        }],
    }],
};
exports.sentry = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABEL: 'Sentry',
    DANGER: 3,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 10,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE,
        HEALTH: base.HEALTH * 0.3,
        SPEED: base.SPEED * 0.5,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.trapTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'], 
    COLOR: 16,
    SKILL: setBuild("9909999999"),
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    14,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    14,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowpower, g.fast, g.halfreload, g.halfreload, g.double_damage]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                AUTOFIRE: true
            }, },
    ],
};
exports.sentrySwarm = {
    PARENT: [exports.sentry],
    DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
exports.sentryGun = makeAuto(exports.sentry, 'Sentry', { type: exports.heavy3gun, size: 12, });
exports.sentryTrap = makeAuto(exports.sentry, 'Sentry', { type: exports.trapTurret, size: 12, });

exports.miniboss = {
    PARENT: [exports.genericTank],
    TYPE: "miniboss",
    DANGER: 6,
    SKILL: skillSet({
        rld: .7,
        dam: .5,
        pen: .8,
        str: .8,
        spd: .2,
        atk: .3,
        hlt: 1,
        shi: .7,
        rgn: .7,
        mob: 0
    }),
    LEVEL: 45,
    CONTROLLERS: ["nearestDifferentMaster", "bossorbit", "canRepel"],
    AI: {
        NO_LEAD: true
    },
    FACING_TYPE: "autospin",
    HITS_OWN_TYPE: "hardOnlyBosses",
    BROADCAST_MESSAGE: "A visitor has left!"
};
exports.crasherSpawner = {
    PARENT: [exports.genericTank],
    LABEL: "Spawned",
    STAT_NAMES: statnames.drone,
    CONTROLLERS: ["nearestDifferentMaster"],
    COLOR: 5,
    INDEPENDENT: true,
    AI: {
        chase: true
    },
    MAX_CHILDREN: 4,
    GUNS: [{
        POSITION: [6, 12, 1.2, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
            TYPE: [exports.drone, {
                LABEL: "Crasher",
                VARIES_IN_SIZE: true,
                DRAW_HEALTH: true
            }],
            SYNCS_SKILLS: true,
            AUTOFIRE: true,
            STAT_CALCULATOR: gunCalcNames.drone
        }
    }]
};
exports.elite = {
    PARENT: [exports.miniboss],
    LABEL: "Elite Crasher",
    COLOR: 5,
    SHAPE: 3,
    SIZE: 27,
    VARIES_IN_SIZE: true,
    VALUE: 15e4,
    BODY: {
        FOV: 1.25,
        SPEED: .1 * base.SPEED + 1,
        HEALTH: 7 * base.HEALTH,
        DAMAGE: 2.5 * base.DAMAGE
    }
};
exports.elite_spinner = {
  PARENT: [exports.elite],
  LABEL: 'Elite Spinner',
  FACING_TYPE: 'auto2spin',
  TURRETS: [
    {
      POSITION: [10, 0, 0, 0, 360, 1],
      TYPE: [exports.hurricane, {CONTROLLERS: ['reversespin'], AUTOFIRE: true, COLOR: 5}]
    }
  ], GUNS: [
    {
      POSITION: [16, 2, 1, 0, 4, 120, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
        TYPE: exports.bullet
      }
    },{
      POSITION: [15, 2, 1, -4, 8, 120, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
        TYPE: exports.bullet
      }
    },{
      POSITION: [14, 2, 1, -8, 12, 120, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [16, 2, 1, 0, 4, 240, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
        TYPE: exports.bullet
      }
    },{
      POSITION: [15, 2, 1, -4, 8, 240, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
        TYPE: exports.bullet
      }
    },{
      POSITION: [14, 2, 1, -8, 12, 240, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
        TYPE: exports.bullet
      }
    },{
      POSITION: [16, 2, 1, 0, 4, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
        TYPE: exports.bullet
      }
    },{
      POSITION: [15, 2, 1, -4, 8, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
        TYPE: exports.bullet
      }
    },{
      POSITION: [14, 2, 1, -8, 12, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
        TYPE: exports.bullet
      }
    }, {
      POSITION: [5, 29, 0.6, 5, 0, (360 * 1.5) / 3, 0]
    },{
      POSITION: [5, 29, 0.6, 5, 0, (360 * 2.5) / 3, 0]
    },{
      POSITION: [5, 29, 0.6, 5, 0, (360 * 3.5) / 3, 0]
    }
  ]
}
exports.elite_destroyer = {
    PARENT: [exports.elite],
    LABEL: 'Elite Destroyer',
    GUNS: [{
        POSITION: [5, 16, 1, 6, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
            TYPE: exports.bullet,
            LABEL: "Devastator"
        }
    }, {
        POSITION: [5, 16, 1, 6, 0, 60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
            TYPE: exports.bullet,
            LABEL: "Devastator"
        }
    }, {
        POSITION: [5, 16, 1, 6, 0, -60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
            TYPE: exports.bullet,
            LABEL: "Devastator"
        }
    }],
    TURRETS: [{
        POSITION: [11, 0, 0, 180, 360, 0],
        TYPE: [exports.crasherSpawner]
    }, {
        POSITION: [11, 0, 0, 60, 360, 0],
        TYPE: [exports.crasherSpawner]
    }, {
        POSITION: [11, 0, 0, -60, 360, 0],
        TYPE: [exports.crasherSpawner]
    }, {
        POSITION: [11, 0, 0, 0, 360, 1],
        TYPE: [exports.bigauto4gun, {
            INDEPENDENT: true,
            COLOR: 5
        }]
    }]
};
exports.elite_gunner = {
    PARENT: [exports.elite],
    LABEL: 'Elite Gunner',
    FACING_TYPE: 'locksFacing',
    GUNS: [{
        POSITION: [14, 16, 1, 0, 0, 180, 0]
    }, {
        POSITION: [4, 16, 1.5, 14, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: [exports.epillbox, {
                INDEPENDENT: true
            }]
        }
    }, {
        POSITION: [6, 14, -2, 2, 0, 60, 0]
    }, {
        POSITION: [6, 14, -2, 2, 0, 300, 0]
    }],
    AI: {
        NO_LEAD: false
    },
    TURRETS: [{
        POSITION: [14, 8, 0, 60, 180, 0],
        TYPE: [exports.auto4gun]
    }, {
        POSITION: [14, 8, 0, 300, 180, 0],
        TYPE: [exports.auto4gun]
    }]
};
exports.elite_devourer = {
    PARENT: [exports.elite],
    LABEL: 'Elite Devourer',    GUNS: [{
        POSITION: [14, 16, 1, 0, 0, 180, 0]
    }, {
        POSITION: [4, 16, 1.5, 14, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: [exports.epillbox, {
                INDEPENDENT: true
            }]
        }
    }, {
        POSITION: [14, 16, 1, 0, 0, 300, 0]
    }, {
        POSITION: [4, 16, 1.5, 14, 0, 300, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: [exports.epillbox, {
                INDEPENDENT: true
            }]
        }
    }, {
        POSITION: [14, 16, 1, 0, 0, 60, 0]
    }, {
        POSITION: [4, 16, 1.5, 14, 0, 60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: [exports.epillbox, {
                INDEPENDENT: true
            }]
        }
    }, {
      POSITION: [14, 6, 0.1, 0, 3, 60, 0]
    },{
      POSITION: [14, 6, 0.1, 0, 3, 300, 0]
    },{
      POSITION: [14, 6, 0.1, 0, 3, 180, 0]
    },
    {
      POSITION: [14, 6, 0.1, 0, -3, 60, 0]
    },{
      POSITION: [14, 6, 0.1, 0, -3, 300, 0]
    },{
      POSITION: [14, 6, 0.1, 0, -3, 180, 0]
    }],
    AI: {
        NO_LEAD: false
    },
    TURRETS: [
      {
        POSITION: [8, 0, 0, 0, 360, 1],
        TYPE: [exports.autoTurret, {PARENT: [exports.sidewind]}]
      }
    ]
};
exports.uziTurret = {
  PARENT: [exports.autoTurret],
  SKILL: setBuild("9999999999"),
  HAS_NO_RECOIL: true,
  GUNS: [
    {
      POSITION: [20, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.half_health, g.half_health, g.power]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [17, 8, 1, 0, 0, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.half_health, g.half_health, g.power]),
        TYPE: exports.bullet
      }
    }
  ]
}
exports.super_uzi = {
  PARENT: [exports.miniboss],
  LABEL: 'Super Uzi',
  SIZE: 30,
  SHAPE: 9,
  COLOR: 42,
  BODY: {
    HEALTH: 2500,
    SPEED: 1.25
  },
  TURRETS: (()=> {
    var tr = [
      {
        POSITION: [12, 0, 0, 0, 360, 1],
        TYPE: exports.uziTurret
      }
    ]
    for (let i = 0.5; i < 9; i++) {
      tr.push({
        POSITION: [6, 10, 0, (360 * i) / 9, 90, 0],
        TYPE: exports.uziTurret
      })
    }
    return tr
  })()
}
exports.immortal_super_uzi = {
  PARENT: [exports.miniboss],
  LABEL: 'Super Uzi',
  SIZE: 30,
  SHAPE: 9,
  COLOR: 42,
  BODY: {
    HEALTH: 2500000,
    DAMAGE: 10,
    SPEED: 1.25
  },
  CONTROLLERS: ['gotorm'],
  TURRETS: (()=> {
    var tr = [
      {
        POSITION: [12, 0, 0, 0, 360, 1],
        TYPE: exports.uziTurret
      }
    ]
    for (let i = 0.5; i < 9; i++) {
      tr.push({
        POSITION: [6, 10, 0, (360 * i) / 9, 90, 0],
        TYPE: exports.uziTurret
      })
    }
    return tr
  })()
}
exports.elite_sprayer_trio = {
          PARENT: [exports.genericTank],
          LABEL: 'Trio',
          COLOR: 5,
          CONTROLLERS: ['reverseslowspin'],
          GUNS: []
        }
        for (let i = 0; i < 3; i++) {
          exports.elite_sprayer_trio.GUNS.push({
            POSITION: [20, 8, 1.4, 0, 0, (360 * i) / 3, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.lessreload]),
              TYPE: exports.bullet,
              AUTOFIRE: true
            }
          })
        }
        exports.e_spray = {
                PARENT: [exports.autoTurret],
                LABEL: '',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
   
        exports.elite_sprayer = { 
            PARENT: [exports.elite],
            LABEL: 'Elite Sprayer',
            AI: { NO_LEAD: false, },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  6,     7,      5,     180,     190, 0], 
                    TYPE: [exports.e_spray, { COLOR: 5, }],
                        }, {
                POSITION: [  6,     7,      5,      60,    190, 0], 
                    TYPE: [exports.e_spray, { COLOR: 5, }],
                        }, {
                POSITION: [  6,     7,      5,     -60,    190, 0], 
                    TYPE: [exports.e_spray, { COLOR: 5, }],
                        },
                {
                POSITION: [  6,     7,      -5,     180,     190, 0], 
                    TYPE: [exports.e_spray, { COLOR: 5, }],
                        }, {
                POSITION: [  6,     7,      -5,      60,    190, 0], 
                    TYPE: [exports.e_spray, { COLOR: 5, }],
                        }, {
                POSITION: [  6,     7,      -5,     -60,    190, 0], 
                    TYPE: [exports.e_spray, { COLOR: 5, }],
                        },
                        {
                POSITION: [  6,     0,       0,       0,    360,  1],
                    TYPE: exports.elite_sprayer_trio
                        }
            ],
        };
        exports.elite_overseer = {
          PARENT: [exports.elite],
          GUNS: [{ 
            POSITION: [14, 10, 1.3, 0, 0, 60, 0],
            PROPERTIES: { }
          }]
        };
 exports.rifleturret = {
  PARENT: [exports.autoTurret],
  LABEL: "Rifle",
  COLOR: 40,
  BODY: {
    ACCELERATION: base.ACCEL * 0.7,
    FOV: base.FOV * 1.225,
  },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [20, 10.5, 1, 0, 0, 0, 0],
    },
    {
      POSITION: [24, 7, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
        TYPE: exports.bullet,
      },
    },
  ],
};
exports.duorifle = {
  PARENT: [exports.autoTurret],
  LABEL: "Rifle",
  COLOR: 40,
  BODY: {
    ACCELERATION: base.ACCEL * 0.7,
    FOV: base.FOV * 1.225,
  },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [20, 6, 1, 0, -5.5, 0, 0],
    },
    {
      POSITION: [24, 2, 1, 0, -5.5, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
        TYPE: exports.bullet,
      },
    },
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [20, 6, 1, 0, 5.5, 0, 0],
    },
    {
      POSITION: [24, 2, 1, 0, 5.5, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
        TYPE: exports.bullet,
      },
    },
  ],
};
exports.eliterifle = {
  PARENT: [exports.miniboss],
  LABEL: "Elite Rifle",
  SHAPE: [
    [-0.981, -0.199],
    [-0.982, 0.192],
    [-0.833, 0.553],
    [-0.558, 0.831],
    [-0.197, 0.983],
    [0.192, 0.984],
    [0.555, 0.833],
    [0.831, 0.559],
    [0.983, 0.2],
    [0.984, -0.192],
    [0.835, -0.554],
    [0.559, -0.831],
    [0.2, -0.982],
    [-0.191, -0.984],
    [-0.554, -0.835],
    [-0.831, -0.56],
  ],
  COLOR: 40,
  SIZE: 55,
  BODY: {
    HEALTH: 1400,
    DAMAGE: 2,
    SPEED: 1.2,
  },
  GUNS: [
    {
      POSITION: [15, 2.5, 0.6, 0, 0, (360 * 0) / 16, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lessreload]),
        TYPE: exports.swarm,
      },
    },
    {
      POSITION: [15, 2.5, 0.6, 0, 0, (360 * 2) / 16, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lessreload]),
        TYPE: exports.swarm,
      },
    },
    {
      POSITION: [15, 2.5, 0.6, 0, 0, (360 * 4) / 16, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lessreload]),
        TYPE: exports.swarm,
      },
    },
    {
      POSITION: [15, 2.5, 0.6, 0, 0, (360 * 6) / 16, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lessreload]),
        TYPE: exports.swarm,
      },
    },
    {
      POSITION: [15, 2.5, 0.6, 0, 0, (360 * 8) / 16, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lessreload]),
        TYPE: exports.swarm,
      },
    },
    {
      POSITION: [15, 2.5, 0.6, 0, 0, (360 * 10) / 16, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lessreload]),
        TYPE: exports.swarm,
      },
    },
    {
      POSITION: [15, 2.5, 0.6, 0, 0, (360 * 12) / 16, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lessreload]),
        TYPE: exports.swarm,
      },
    },
    {
      POSITION: [15, 2.5, 0.6, 0, 0, (360 * 14) / 16, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lessreload]),
        TYPE: exports.swarm,
      },
    },
  ],
  TURRETS: [
    {
      POSITION: [4, 10, 0, (360 * 1) / 16, 180, 0],
      TYPE: exports.rifleturret,
    },
    {
      POSITION: [4, 10, 0, (360 * 3) / 16, 180, 0],
      TYPE: exports.rifleturret,
    },
    {
      POSITION: [4, 10, 0, (360 * 5) / 16, 180, 0],
      TYPE: exports.rifleturret,
    },
    {
      POSITION: [4, 10, 0, (360 * 7) / 16, 180, 0],
      TYPE: exports.rifleturret,
    },
    {
      POSITION: [4, 10, 0, (360 * 9) / 16, 180, 0],
      TYPE: exports.rifleturret,
    },
    {
      POSITION: [4, 10, 0, (360 * 11) / 16, 180, 0],
      TYPE: exports.rifleturret,
    },
    {
      POSITION: [4, 10, 0, (360 * 13) / 16, 180, 0],
      TYPE: exports.rifleturret,
    },
    {
      POSITION: [4, 10, 0, (360 * 15) / 16, 180, 0],
      TYPE: exports.rifleturret,
    },
    {
      POSITION: [6, 6, 0, (360 * 1) / 16, 180, 1],
      TYPE: exports.duorifle,
    },
    {
      POSITION: [6, 6, 0, (360 * 5) / 16, 180, 1],
      TYPE: exports.duorifle,
    },
    {
      POSITION: [6, 6, 0, (360 * 9) / 16, 180, 1],
      TYPE: exports.duorifle,
    },
    {
      POSITION: [6, 6, 0, (360 * 13) / 16, 180, 1],
      TYPE: exports.duorifle,
    },
  ],
};
exports.elite_battleship = {
    PARENT: [exports.elite],
    LABEL: 'Elite Battleship',
    GUNS: [{
        POSITION: [4, 6, .6, 7, -8, 60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [4, 6, .6, 7, 0, 60, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [4, 6, .6, 7, 8, 60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [4, 6, .6, 7, -8, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [4, 6, .6, 7, 0, 180, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [4, 6, .6, 7, 8, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [4, 6, .6, 7, -8, -60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [4, 6, .6, 7, 0, -60, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [4, 6, .6, 7, 8, -60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }],
    TURRETS: [{
        POSITION: [5, 7, 0, 0, 360, 1],
        TYPE: [exports.auto3gun, {
            INDEPENDENT: true,
            COLOR: 5
        }]
    }, {
        POSITION: [5, 7, 0, 120, 360, 1],
        TYPE: [exports.auto3gun, {
            INDEPENDENT: true,
            COLOR: 5
        }]
    }, {
        POSITION: [5, 7, 0, 240, 360, 1],
        TYPE: [exports.auto3gun, {
            INDEPENDENT: true,
            COLOR: 5
        }]
    }]
};
exports.palisade = (() => {
    let T = {
        SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.halfreload, g.halfreload]),
        TYPE: exports.minion,
        STAT_CALCULATOR: gunCalcNames.drone,
        AUTOFIRE: true,
        MAX_CHILDREN: 1,
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true
    };
    return {
        PARENT: [exports.miniboss],
        LABEL: "Rogue Palisade",
        COLOR: 17,
        SHAPE: 6,
        SIZE: 30,
        VALUE: 5e5,
        BODY: {
            FOV: 1.4,
            SPEED: .05 * base.SPEED,
            HEALTH: 16 * base.HEALTH,
            SHIELD: 3 * base.SHIELD,
            DAMAGE: 3 * base.DAMAGE
        },
        GUNS: [{
            POSITION: [4, 6, -1.6, 8, 0, 0, 0],
            PROPERTIES: T
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 60, 0],
            PROPERTIES: T
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 120, 0],
            PROPERTIES: T
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                TYPE: exports.minion,
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                MAX_CHILDREN: 1,
                SYNCS_SKILLS: true,
                WAIT_TO_CYCLE: true
            }
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 240, 0],
            PROPERTIES: T
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 300, 0],
            PROPERTIES: T
        }],
        TURRETS: [{
            POSITION: [5, 10, 0, 30, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 90, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 150, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 210, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 270, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 330, 110, 0],
            TYPE: exports.trapTurret
        }]
    }
})(), exports.skimboss = {
    PARENT: [exports.elite],
    LABEL: "Elite Skimmer",
    COLOR: 2,
    TURRETS: [{
        POSITION: [15, 5, 0, 60, 170, 0],
        TYPE: exports.skimturret
    }, {
        POSITION: [15, 5, 0, 180, 170, 0],
        TYPE: exports.skimturret
    }, {
        POSITION: [15, 5, 0, 300, 170, 0],
        TYPE: exports.skimturret
    }]
};
exports.summoner = {
    PARENT: [exports.miniboss],
    LABEL: "Summoner",
    DANGER: 8,
    SHAPE: 4,
    COLOR: 13,
    SIZE: 26,
    MAX_CHILDREN: 28,
    FACING_TYPE: "autospin",
    VALUE: 3e5,
    BODY: {
        FOV: .5,
        SPEED: .1 * base.SPEED,
        HEALTH: 7 * base.HEALTH,
        DAMAGE: 2.6 * base.DAMAGE
    },
    GUNS: [{
        POSITION: [3.5, 8.65, 1.2, 8, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner]),
            TYPE: exports.sunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true
        }
    }, {
        POSITION: [3.5, 8.65, 1.2, 8, 0, 270, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner]),
            TYPE: exports.sunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true
        }
    }, {
        POSITION: [3.5, 8.65, 1.2, 8, 0, 0, .25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner]),
            TYPE: exports.sunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true
        }
    }, {
        POSITION: [3.5, 8.65, 1.2, 8, 0, 180, .75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner]),
            TYPE: exports.sunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true
        }
    }]
};
exports.nestKeeperTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Boomer Turret',
    CONTROLLERS: ['nearestDifferentMaster'],
    BODY: {
        SPEED: base.SPEED * .8,
        FOV: base.FOV * 1.15
    },
    GUNS: [{
        POSITION: [18, 10, 1, 0, 0, 0, 0]
    }, {
        POSITION: [6, 10, -1.5, 7, 0, 0, 0]
    }, {
        POSITION: [2, 10, 1.3, 18, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.one_third_reload, g.more_speed]),
            TYPE: exports.boomerang
        }
    }]
};
exports.nestKeeper = {
    PARENT: [exports.miniboss],
    LABEL: 'Nest Keeper',
    COLOR: 14,
    SHAPE: 5,
    SIZE: 50,
    BODY: {
        FOV: 1.3,
        SPEED: base.SPEED * .25,
        HEALTH: base.HEALTH * 9,
        SHIELD: base.SHIELD * 1.5,
        REGEN: base.REGEN,
        DAMAGE: base.DAMAGE * 2.5
    },
    MAX_CHILDREN: 15,
    GUNS: [{
        POSITION: [3.5, 6.65, 1.2, 8, 0, 35, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            LABEL: 'Nest Keeper Mega Crasher',
        },
    }, {
        POSITION: [3.5, 6.65, 1.2, 8, 0, -35, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            LABEL: 'Nest Keeper Mega Crasher'
        }
    }, {
        POSITION: [3.5, 6.65, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            LABEL: 'Nest Keeper Mega Crasher'
        }
    }, {
        POSITION: [3.5, 6.65, 1.2, 8, 0, 108, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            LABEL: 'Nest Keeper Mega Crasher'
        }
    }, {
        POSITION: [3.5, 6.65, 1.2, 8, 0, -108, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            LABEL: 'Nest Keeper Mega Crasher'
        }
    }],
    TURRETS: [{
        POSITION: [8, 9, 0, 72, 120, 0],
        TYPE: [exports.auto4gun, {
            INDEPENDENT: true,
            COLOR: 14
        }]
    }, {
        POSITION: [8, 9, 0, 0, 120, 0],
        TYPE: [exports.auto4gun, {
            INDEPENDENT: true,
            COLOR: 14
        }]
    }, {
        POSITION: [8, 9, 0, 144, 120, 0],
        TYPE: [exports.auto4gun, {
            INDEPENDENT: true,
            COLOR: 14
        }]
    }, {
        POSITION: [8, 9, 0, 216, 120, 0],
        TYPE: [exports.auto4gun, {
            INDEPENDENT: true,
            COLOR: 14
        }]
    }, {
        POSITION: [8, 9, 0, -72, 120, 0],
        TYPE: [exports.auto4gun, {
            INDEPENDENT: true,
            COLOR: 14
        }]
    }, {
        POSITION: [9, 0, 0, 0, 360, 1],
        TYPE: [exports.nestKeeperTurret, {
            INDEPENDENT: true,
            COLOR: 14
        }]
    }]
};

exports.bot = {
    AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
    BODY: {
        SIZE: 12,
         HEALTH: base.HEALTH * 0.75,
        DAMAGE: base.DAMAGE * 0.75,
   },
    //COLOR: 17,
    NAME: "[AI] ",
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'bot', 'goto', 'fleeAtLowHealth'
    ],
    AI: { STRAFE: true, },
    SKILL: skillSet({
        rld: 0.875,
        spd: 0.875,
        dam: 0.875, 
         pen: 0.875,
         str: 0.875,
        atk: 0.875,
    }),
 };

exports.octoblock = {
    PARENT: [exports.block],
    SHAPE: -8,
                LABEL: 'Octo Block',
                CUSTOM: true,
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     4,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.flank, g.spam,]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  18,     4,      1,      0,      0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.flank, g.spam,]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  18,     4,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.flank, g.spam,]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  18,     4,      1,      0,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.flank, g.spam,]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  18,     4,      1,      0,      0,      45,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.flank, g.spam,]),
                            TYPE: exports.bullet, 
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  18,     4,      1,      0,      0,     135,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.flank, g.spam,]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {
                    POSITION: [  18,     4,      1,      0,      0,     225,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.flank, g.spam,]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  18,     4,      1,      0,      0,     315,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.flank, g.spam,]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        }, },
                ],
            };

exports.supertest = {
    PARENT: [exports.genericTank],
    LABEL: 'Octolauncher',
    CUSTOM: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     16,      0.5,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,  g.halfsize,  g.octoblock]),
            TYPE: exports.octoblock,
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  12,     18,      0.8,      0,      0,      0,      0,   ], 
        },
    ],
};

exports.weenus = {
    PARENT: [exports.genericTank],
    LABEL: 'Weiner',
    CUSTOM: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  99999,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.weiner]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};


exports.ball = {
    PARENT: [exports.genericTank],
    LABEL: 'BIG BALL',
    CUSTOM: true,
    NAME: 'BIG BALL',
    SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //INVISIBLE: [0.08, 0.03],
    SIZE: 40,
    BODY: {
        ACCELERATION: 10,
        SPEED: 10,
        HEALTH: 10000000,
        RESIST: 10,
        SHIELD: 1000000,
        REGEN: 100000000,
        DAMAGE: 0,
        PENETRATION: 0.001,
        RANGE: 0,
        FOV: 2,
        DENSITY: 100,
        STEALTH: 1,
        PUSHABILITY: 10,        
        HETERO: 2,
  },
};

exports.saw = {
    PARENT: [exports.trap],
    FOOD: {
        LEVEL: 3,
    },
    LABEL: 'Sawblade',
    CUSTOM: true,
    SHAPE: -16,
    DIPMULTI: 0.3,
    DANGER: 7,
    MOTION_TYPE: 'motor', 
    FACING_TYPE: 'toTarget',
    CONTROLLERS: ['fastspin'], 
    BODY: {
        DAMAGE: 1.5 * 1,
        DENSITY: 8,
        HEALTH: 10 * 2,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};

exports.indust = {
    PARENT: [exports.genericTank],
    LABEL: 'Industrialist',
    CUSTOM: true,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     16,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload, g.halfreload, g.morespeed, g.morespeed]),
            TYPE: exports.saw,
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.puregunner, g.fast, g.morespeed, g.morespeed]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.puregunner, g.fast, g.morespeed, g.morespeed]),
                        TYPE: exports.bullet,
                    }, },
    ],
};

exports.bender5 = {
PARENT: [exports.genericTank],
LABEL: '',
CUSTOM: true,
COLOR: 5,
SHAPE: 4,
TURRETS: [{
       /** SIZE     X       Y     ANGLE    ARC */
POSITION:  [15,     15,      0,      0,     45, 0, ],
TYPE: [exports.testbed, {COLOR:5,}],
COLOR: 5
}],
};
exports.bender4 = {
PARENT: [exports.genericTank],
LABEL: '',
CUSTOM: true,
COLOR: 13,
SHAPE: 4,
TURRETS: [{
       /** SIZE     X       Y     ANGLE    ARC */
POSITION:  [15,     15,      0,      0,     180, 0, ],
TYPE: exports.bender5,
}],
};
exports.bender3 = {
PARENT: [exports.genericTank],
LABEL: '',
CUSTOM: true,
COLOR: 13,
SHAPE: 4,
TURRETS: [{
       /** SIZE     X       Y     ANGLE    ARC */
POSITION:  [15,     15,      0,      0,     180, 0, ],
TYPE: exports.bender4,
}],
};
exports.bender2 = {
PARENT: [exports.genericTank],
LABEL: '',
CUSTOM: true,
COLOR: 13,
SHAPE: 4,
TURRETS: [{
       /** SIZE     X       Y     ANGLE    ARC */
POSITION:  [15,     15,      0,      0,     180, 0, ],
TYPE: exports.bender3,
}],
};
exports.bender1 = {
PARENT: [exports.genericTank],
LABEL: '',
CUSTOM: true,
COLOR: 13,
SHAPE: 4,
TURRETS: [{
       /** SIZE     X       Y     ANGLE    ARC */
POSITION:  [15,     15,      0,      0,     180, 0, ],
TYPE: exports.bender2,
}],
};

exports.leftball = {
PARENT: [exports.genericTank],
LABEL: 'Left Nut',
CUSTOM: true,
COLOR: 13,
SHAPE: 0,
};
exports.rightball = {
PARENT: [exports.genericTank],
LABEL: 'Right Nut',
CUSTOM: true,
COLOR: 13,
SHAPE: 0,
};

exports.bender = {
PARENT: [exports.genericTank],
LABEL: 'Time to take a piss',
CUSTOM: true,
COLOR: 13,
FACING_TYPE: 'locksFacing',
SHAPE:  0,
BODY: {
    SHIELD: 999999,
    REGEN: 999999,
},
TURRETS: [{
       /** SIZE     X       Y     ANGLE    ARC */
POSITION:  [15,     15,      0,      0,     180, 0, ],
TYPE: exports.bender1,
},{
       /** SIZE     X       Y     ANGLE    ARC */
POSITION:  [25,     0,      10,      0,     0, 1, ],
TYPE: exports.leftball,
},{
       /** SIZE     X       Y     ANGLE    ARC */
POSITION:  [25,     0,     -10,      0,     0, 1, ],
TYPE: exports.rightball,
},
],};

exports.invissymbol = {
    PARENT: [exports.genericTank],
    CUSTOM: true,
    LABEL: '',
    SHAPE: 0
};

exports.invisblock = {
        PARENT: [exports.block],
        CUSTOM: true,
        INVISIBLE: [0.08, 0.03],
                  TURRETS: [{
            POSITION: [10, 0, 0, 0, 360, 1, ],
            TYPE: exports.invissymbol,
            }],
    };

exports.miner = {
                PARENT: [exports.genericTank],
                LABEL: 'Miner',
                CUSTOM: true,
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                STAT_NAMES: statnames.trap,
                DANGER: 7,
                GUNS: [  {
                    POSITION: [  15,     7,      1,      0,      3.5,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.invisblock,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      -3.5,      0,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.invisblock,
                        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [        3,     14,     1.1,    15,      0,      0,      0,   ],
                        },
                  ],
};

exports.imposter = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 1.2,
            },
              TURRETS: [{
            /** SIZE     X       Y     ANGLE    ARC */
            POSITION: [10, 0, 0, 0, 360, 1, ],
            TYPE: exports.invissymbol,
            }],
            INVISIBLE: [0.06, 0.01],
            LABEL: 'Imposter',
            CUSTOM: true,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, }, 
            ],
        };

exports.nap = {
                PARENT: [exports.genericTank],
                LABEL: 'Kidnapper',
                CUSTOM: true,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,    12,      1,      0,      0,      0,     0.15, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  18,    16,      1,      0,      0,      0,     0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  15,    20,      1,      0,      0,      0,     0.45,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, },
                       
                ],
            };

exports.furnace = {
        PARENT: [exports.genericTank],
        LABEL: 'Furnace',
        CUSTOM: true,
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    15,     4,     1.4,     8,      0,      0,      0,   ],  
            },  {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    10,     15,     0.6,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.halfsize, g.moredamge, g.lessspeed]),
                TYPE: exports.flare,
            }, }, 
        ],
    };

exports.traptrapper = {
    LABEL: 'Trap Trapper',
    CUSTOM: true,
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: 3, 
    NECRO: true,
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 0.8 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        RANGE: 150,
        DENSITY: 1.5,
        RESIST: 1.5,
        SPEED: 0,
    },
          GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      60,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload]),
                    TYPE: [exports.trap, { PERSISTS_AFTER_DEATH: true, }],
                    AUTOFIRE: true,
                }, }, {   
            POSITION: [  15,     8,      1,      0,      0,     180,     0.1,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload]),
                    TYPE: [exports.trap, { PERSISTS_AFTER_DEATH: true, }],
                    AUTOFIRE: true,
                }, }, {   
            POSITION: [  15,     8,      1,      0,      0,     300,     0.2,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload]),
                    TYPE: [exports.trap, { PERSISTS_AFTER_DEATH: true, }],
                    AUTOFIRE: true,
                }, },
        ],
};
            exports.dumptruck = {
                PARENT: [exports.genericTank],
                LABEL: 'Dumptruck',
                CUSTOM: true,
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     17,      1.3,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     19,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.doublereload, g.morespeed]),
                            TYPE: exports.traptrapper, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  2,     25,      1,      14,      0,      0,      0,   ],
                        }, 
                  ],
            };

exports.omega = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Ω',
                CUSTOM: true,
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20,     20,     2,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni,g.pound, g.destroy, g.anni,g.omega]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };

exports.explosivetrap = {
    LABEL: 'Trap',
    CUSTOM: true,
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3, 
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'hardWithBuffer',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 10,
        RESIST: 1,
        SPEED: 0,
        PUSHABILITY: 30,
    },
};

exports.exploder = {
    PARENT: [exports.genericTank],
    LABEL: 'Exploder',
    CUSTOM: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      0.5,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1.5,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.morereload, g.morereload,g.explosivetrap]),
                    TYPE: [exports.explosivetrap],

                }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     0.7,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.puregunner, g.fast, g.morespeed, g.morespeed]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     0.7,      0,    -7.25,    0,     0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.puregunner, g.fast, g.morespeed, g.morespeed]),
                        TYPE: exports.bullet,
                    }, },
    ],
};

exports.torpedo = {
    //faster torpedo = more damage
    LABEL: 'Torpedo',
    CUSTOM: true,
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 5,
        SPEED: 0,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 3 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
        GUNS: [ { 
                  //LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [  20,     10,      1.5,       0,      0,      180,      0,   ], 
        PROPERTIES: {
        SHOOT_SETTINGS: combineStats([    
        //RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  
        [3,      3,     1,      1,      1,      1,      1,      1,      1,      0.1,      1,      1,      1],
        ]),
      TYPE: exports.bullet, 
          AUTOFIRE: true,
    },
  }, 
],
};

exports.balli = {
    PARENT: [exports.genericTank],
    FACING_TYPE: 'locksFacing',
    LABEL: 'Ballistic',
    CUSTOM: true,
              BODY: {
                FOV: base.FOV * 1.15,
            },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      0.8,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.morerange, g.lessreload, g.lessreload, g.lessreload, g.lessreload, g.lessreload, g.morehealth]),
            TYPE: exports.torpedo,
            MAX_CHILDREN: 1,      
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  12,     8,      1.5,      0,      0,      0,      0,   ], }, 
    ],
};

exports.dogeTest = {
    PARENT: [exports.genericTank],
    LABEL: 'DogeisCut',
    CUSTOM: true,
    DANGER: 99999,
    SHAPE: 2000,
    VALUE: 999999999999999999,
    HAS_NO_RECOIL: true,
    COLOR: "#eb9d50",
    SKILL: skillSet({ 
    hlt: 100000,
    dam: 100000,
    spd: 100000,
    }),
    SIZE: 24,
    BODY: {
        FOV: 3,
        HEALTH: 999999999999999999,
        DAMAGE: 999999999,
        SPEED: 40
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      0,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      2,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Cleaner',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
           
           
           
           { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      0,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*2,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*3,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*4,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*5,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*6,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*7,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*8,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*9,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*10,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      30*11,      0,   ], 
        PROPERTIES: {               // Reload, recoil, shudder (speed variation), size, health, damage, penetration, speed, max speed, range, density, spray (accuracy variation), resist
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      20,      999999999999999999,      999999999999999999,      999999999999999999,      100,      100,      3,      999999999999999999,      0.0000001,      999999999999999999]]),
            TYPE: exports.bullet,
            LABEL: 'Spreader',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: true,            
            NEGATIVE_RECOIL: false,     // def
            SKIN: 1
        }, }, 
    ],
};
exports.waffzTest = {
    PARENT: [exports.genericTank],
    LABEL: 'Waffz_The_Pancake',
    CUSTOM: true,
    DANGER: 99999,
    SHAPE: 2001,
    HAS_NO_RECOIL: true,
    COLOR: 36,
    SKILL: skillSet({ 
    hlt: 100000,
    dam: 100000,
    spd: 100000,
    }),
    SIZE: 24,
    BODY: {
        FOV: 3,
        HEALTH: 999999999,
        DAMAGE: 999999999,
        SPEED: 40
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.5,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([[1,      1,     0.1,      2,      9999,      9999,      9999,      100,      2,      1,      9999,      0.00001,      0]]),
            TYPE: exports.bullet,
            LABEL: 'Cleaner',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};

exports.bubbleSpike = {
  SHAPE:0,
    CUSTOM: true,
      GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.morespeed]),
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.bubble = {
    LABEL: 'Bubble',
    CUSTOM: true,
    SHAPE: -6,
    DIPMULTI: 2,
    TYPE: 'bullet',
    FACING_TYPE: 'autospin',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 8,
        SPEED: 0,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 1 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    TURRETS: [{/*SIZE     X       Y     ANGLE    ARC */
    POSITION: [  11,      10,      0,      0,     180, 0], 
    TYPE: exports.bubbleSpike,
    },        {/*SIZE     X       Y     ANGLE    ARC */
    POSITION: [  11,      10,      0,      120,     180, 0], 
    TYPE: exports.bubbleSpike,
    },        {/*SIZE     X       Y     ANGLE    ARC */
    POSITION: [  11,      10,      0,      240,     180, 0], 
    TYPE: exports.bubbleSpike,
    },
    ],
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
    TYPE: exports.trap
};

exports.gen = {
    PARENT: [exports.genericTank],
    LABEL: 'Generator',
    CUSTOM: true,
    MAX_CHILDREN: 3,
              BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     16,      1.4,      0,      0,      15,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lessreload, g.lessreload, g.lessreload, g.lessreload, g.morespeed, g.morerange, g.moredamge]),
            TYPE: exports.bubble,
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     16,      1.4,      0,      0,      -15,      0.5,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lessreload, g.lessreload, g.lessreload, g.lessreload, g.morespeed, g.morerange, g.moredamge]),
            TYPE: exports.bubble,
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  21,     14,      1,      0,      0,      0,      0.5,   ],  }, 
    ],
};

exports.arenaCloser = {
    PARENT: [exports.genericTank],
    LABEL: 'Arena Closer',
    DANGER: 10,
    SIZE: 34,
    SKILL: skillSet({ 
    rld: 10,
    spd: 5,
    }),
    COLOR: 3, //13,
    LAYER: 13,
  
    // AI: {
    //             FULL_VIEW: true,
    //             SKYNET: true,
    //             BLIND: true,
    //             LIKES_SHAPES: true
    //     },
    // CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    // SKILL: Array(10).fill(9),
    // ACCEPTS_SCORE: false,
    // CAN_BE_ON_LEADERBOARD: false,
    // VALUE: 100000,
    // NAME: 'Arena Closer',
  
    BODY: {
        REGEN: 1e5,
        HEALTH: 1e6,
        DENSITY: 30,
        DAMAGE: 1e5,
        FOV: 1.15,
        SPEED: 15
    },
    DRAW_HEALTH: false,
    HITS_OWN_TYPE: 'never',
    GUNS: [{
        POSITION: [14, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.arrasmayhem, g.closer, g.morerecoil]),
            TYPE: [exports.bullet, {
                LAYER: 12
            }]
        }
    }]
};
exports.minigunCloser = {
    PARENT: [exports.genericTank],
    LABEL: 'minigun Closer',
    DANGER: 10,
    SIZE: 34,
    SKILL: skillSet({ 
    rld: 1,
    spd: 0.5,
    }),
    COLOR: 3, //13,
    LAYER: 13,
  
    // AI: {
    //             FULL_VIEW: true,
    //             SKYNET: true,
    //             BLIND: true,
    //             LIKES_SHAPES: true
    //     },
    // CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    // SKILL: Array(10).fill(9),
    // ACCEPTS_SCORE: false,
    // CAN_BE_ON_LEADERBOARD: false,
    // VALUE: 100000,
    // NAME: 'Arena Closer',
  
    BODY: {
        REGEN: 1e5,
        HEALTH: 1e6,
        DENSITY: 30,
        DAMAGE: 1e5,
        FOV: 1.15,
        SPEED: 15
    },
    DRAW_HEALTH: false,
    HITS_OWN_TYPE: 'never',
    GUNS: [{
        POSITION: [14, 5, 1, 0, 0, 0, 0],
        POSITION: [20, 5, 1, 0, 0, 0, 0],
        POSITION: [26, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.closer]),
            TYPE: [exports.bullet, {
                LAYER: 12
            }]
        }
    }]
};

exports.arenaOpener = {
    PARENT: [exports.genericTank],
    LABEL: 'Arena Opener',
    DANGER: 10,
    SIZE: 34,
    SKILL: skillSet({ 
    rld: 10,
    spd: 5,
    }),
    COLOR: 3, //13,
    LAYER: 13,
  
    // AI: {
    //             FULL_VIEW: true,
    //             SKYNET: true,
    //             BLIND: true,
    //             LIKES_SHAPES: true
    //     },
    // CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    // SKILL: Array(10).fill(9),
    // ACCEPTS_SCORE: false,
    // CAN_BE_ON_LEADERBOARD: false,
    // VALUE: 100000,
    // NAME: 'Arena Opener',
  
    BODY: {
        REGEN: 1e5,
        HEALTH: 1e6,
        DENSITY: 30,
        DAMAGE: 1e5,
        FOV: 1.15,
        SPEED: 15
    },
    DRAW_HEALTH: false,
    HITS_OWN_TYPE: 'never',
    GUNS: [{
        POSITION: [14, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.opener]),
            TYPE: [exports.bullet, {
                LAYER: 12
            }]
        }
    }]
};


exports.scturret = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CUSTOM: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.auto]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.auto]),
                TYPE: exports.bullet,
            }, }, 
        ],
};

exports.scattergun = {
        PARENT: [exports.genericTank],
        LABEL: 'Scattergun',
        CUSTOM: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin,]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin,]),
                TYPE: exports.bullet,
            }, }, 
        ],
                TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 360, 1, ],
        TYPE: exports.scturret,
    }],
};

exports.lance = {
    PARENT: [exports.bullet],
    LABEL: '',
    SIZE: 18/2,
    //DRAW_SELF: false,
};

exports.lancer = {
    PARENT: [exports.genericTank],
    LABEL: 'Lancer',
    CUSTOM: true,
    STAT_NAMES: statnames.lance,
    BODY: {
        SPEED: base.SPEED * 1.1,
        FOV: base.FOV * 1.1,
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     0,   1,      8,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.lancereal]),
            TYPE: exports.lance,
            LABEL: 'Lance',
            AUTOFIRE: true,
        }, }, 
           { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     12,   0.00001,      8,      0,      0,      0,   ], 
        }, 
    ],
};

exports.dominationBody = {
    LABEL: "",
    CONTROLLERS: ["dontTurnDominator"],
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true
};

//should define a base centre and use it for all of them instead of using the level 1
exports.centre = {
            TYPE: "miniboss",
            DANGER: 6,
            PARENT: [exports.genericTank],
            BROADCAST_MESSAGE: 'The Centre has been slain!',
            LABEL: 'Centre',
            CUSTOM: true,
            SIZE: 48,
            CAN_BE_ON_LEADERBOARD: true,
            COLOR: '#FF0000',
            SHAPE:3,
            VALUE: 2000,
            DAMAGE_CLASS: 0,
            ACCEPTS_SCORE: true,
            HEALTH_WITH_LEVEL: false,
            TYPE: "something",
            SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 2000, 
                DAMAGE: 4, 
                PENETRATION: 0.25, 
                SHIELD: 2,
                REGEN: 0,
                FOV: 0.3,
                PUSHABILITY: 0,
                HETERO: 0,
            },
            CONTROLLERS: ['nearestDifferentMaster'],
            FACING_TYPE: 'autospin',
            GUNS: [          {/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      60,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      180,      0.33333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      -60,      0.66666, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },
                ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: [exports.dominationBody, {SHAPE: 6,}]
            },
            ],
            //             }, {
            //     POSITION: [  12,     0,      0,      45,     360,  3], 
            //         TYPE: exports.centreturret,
            //             },
            // ],
        };

exports.noRecoilAutoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    CUSTOM: true,
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.norecoil, g.turret]),
                TYPE: exports.bullet,
            }, },
    ],
};

exports.centre2 = {
            PARENT: [exports.centre],
            BROADCAST_MESSAGE: 'The Centre (Level 2) has been slain!',
            LABEL: 'Centre Level 2',
            CUSTOM: true,
            VALUE: 4000,
            HEALTH_WITH_LEVEL: false,
            BODY: { // def
                SPEED: 0,
                HEALTH: 2500, 
                DAMAGE: 4, 
                PENETRATION: 0.25, 
                SHIELD: 2,
                REGEN: 0,
                FOV: 0.3,
                PUSHABILITY: 0,
                HETERO: 0,
            },GUNS: [          {/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      60,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      180,      0.33333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      -60,      0.66666, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },
                ],TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: [exports.dominationBody, {SHAPE: 6,}]
            },
            ],
        };
exports.centre2 = makeAuto(exports.centre2, "Centre Level 2", { type: exports.noRecoilAutoTurret, size:11, });

exports.centre3 = {
            PARENT: [exports.centre],
            BROADCAST_MESSAGE: 'The Centre (Level 3) has been slain!',
            LABEL: 'Centre Level 3',
            CUSTOM: true,
            VALUE: 6000,
            HEALTH_WITH_LEVEL: false,
            BODY: { // def
                SPEED: 0,
                HEALTH: 3000, 
                DAMAGE: 4, 
                PENETRATION: 0.25, 
                SHIELD: 2,
                REGEN: 0,
                FOV: 0.3,
                PUSHABILITY: 0,
                HETERO: 0,
            }, GUNS: [          {/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      60,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      180,      0.33333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      -60,      0.66666, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },
                ],TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: [exports.dominationBody, {SHAPE: 6,}]
                },
            ],
           
      };
exports.centre3 = makeAuto(exports.centre3, "Centre Level 3", { type: exports.centre, size:11, } );

exports.centre4 = {
            PARENT: [exports.centre],
            BROADCAST_MESSAGE: 'The Centre (Level 4) has been slain!',
            LABEL: 'Centre Level 4',
            CUSTOM: true,
            VALUE: 8000,
            SHAPE: 6,
            HEALTH_WITH_LEVEL: false,
            BODY: { // def
                SPEED: 0,
                HEALTH: 3500, 
                DAMAGE: 4, 
                PENETRATION: 0.25, 
                SHIELD: 0,
                REGEN: 0,
                FOV: 0.3,
                PUSHABILITY: 0,
                HETERO: 0,
            },GUNS: [          {/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      60,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      180,      0.33333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      -60,      0.66666, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.drone, {VALUE: 300, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, }, {/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     12,     1,     0,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.noshudder, g.pound, g.destroy, g.anni,g.norecoil,g.morespeed,g.halfreload,g.halfreload,g.morespeed,g.morespeed,g.halfreload,g.halfreload,g.morespeed]),
                            TYPE: exports.bullet, STAT_CALCULATOR: gunCalcNames.bullet,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     12,     1,     0,     0,      120,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.noshudder, g.pound, g.destroy, g.anni,g.norecoil,g.morespeed,g.halfreload,g.halfreload,g.morespeed,g.morespeed,g.halfreload,g.halfreload,g.morespeed]),
                            TYPE: exports.bullet, STAT_CALCULATOR: gunCalcNames.bullet,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     12,     1,     0,     0,      240,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.noshudder, g.pound, g.destroy, g.anni,g.norecoil,g.morespeed,g.halfreload,g.halfreload,g.morespeed,g.morespeed,g.halfreload,g.halfreload,g.morespeed]),
                            TYPE: exports.bullet, STAT_CALCULATOR: gunCalcNames.bullet,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },
                ],TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: [exports.dominationBody, {SHAPE: 6,}]
            },
            ],
           
      };
exports.centre4 = makeAuto(exports.centre4, "Centre Level 4", { type: exports.centre, size:11, } );

exports.centre5 = {
            PARENT: [exports.centre],
            BROADCAST_MESSAGE: 'The Centre (Level 5) has been slain! (Impressive!)\nThe Centre has been reset to level 1!',
            LABEL: 'Centre Level 5',
            CUSTOM: true,
            VALUE: 100000,
            SHAPE: 6,
            HEALTH_WITH_LEVEL: false,
            BODY: { // def
                SPEED: 0,
                HEALTH: 4000, 
                DAMAGE: 4, 
                PENETRATION: 0.25, 
                SHIELD: 0,
                REGEN: 0,
                FOV: 0.3,
                PUSHABILITY: 0,
                HETERO: 0,
            },GUNS: [          {/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      60,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.turreteddrone, {VALUE: 600, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 15,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      180,      0.33333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                            TYPE: [exports.turreteddrone, {VALUE: 600, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 15,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     15,     0.6,     0,     0,      -60,      0.66666, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfhealth, g.drone, g.mini, g.halfrange,g.norecoil,g.halfsize,g.halfsize,g.doublereload]),
                           TYPE: [exports.turreteddrone, {VALUE: 600, HEALTH_WITH_LEVEL: false,}], STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 15,
                        }, },  {/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     12,     1,     0,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.noshudder, g.pound, g.destroy, g.anni,g.norecoil,g.morespeed,g.halfreload,g.halfreload,g.morespeed,g.morespeed,g.halfreload,g.halfreload,g.morespeed]),
                            TYPE: exports.bullet, STAT_CALCULATOR: gunCalcNames.bullet,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     12,     1,     0,     0,      120,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.noshudder, g.pound, g.destroy, g.anni,g.norecoil,g.morespeed,g.halfreload,g.halfreload,g.morespeed,g.morespeed,g.halfreload,g.halfreload,g.morespeed]),
                            TYPE: exports.bullet, STAT_CALCULATOR: gunCalcNames.bullet,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [     12,     12,     1,     0,     0,      240,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.noshudder, g.pound, g.destroy, g.anni,g.norecoil,g.morespeed,g.halfreload,g.halfreload,g.morespeed,g.morespeed,g.halfreload,g.halfreload,g.morespeed]),
                            TYPE: exports.bullet, STAT_CALCULATOR: gunCalcNames.bullet,
                            AUTOFIRE: true,  
                            MAX_CHILDREN: 40,
                        }, },
                ],TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: [exports.dominationBody, {SHAPE: 6,}]
            },
            ],
           
      };
exports.centre5 = makeAuto(exports.centre5, "Centre Level 5", { type: exports.centre2, size:11, } );

exports.mazeWall = {
    PARENT: [exports.obstacle],
    SIZE: 25,
    SHAPE: 4,
    COLOR: '#755600',
    LABEL: "Wall"
};

 exports.mazeWallShooter = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Maze Wall Shooter',
                CUSTOM: true,
                STAT_NAMES: statnames.generic,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.mazeWall,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };

exports.mothership = {
    PARENT: [exports.genericTank],
    LABEL: "Mothership",
    DANGER: 10,
    SIZE: exports.genericTank.SIZE * (7 / 3),
    SHAPE: 16,
    STAT_NAMES: statnames.drone,
    VALUE: 5e5,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    BODY: {
        REGEN: 0,
        FOV: 1,
        SHIELD: 0,
        ACCEL: .2,
        SPEED: .3,
        HEALTH: 2000,
        PUSHABILITY: .15,
        DENSITY: .2,
        DAMAGE: 1.5
    },
    HITS_OWN_TYPE: "pushOnlyTeam",
    GUNS: (() => {
        let e = [],
            T = [1];
        for (let e = 1; e < 8.5; e += .5) {
            let t = e / 16;
            T.push(t);
        }
        for (let t = 0; t < 16; t++) {
            let S = 22.5 * (t + 1),
                E = {
                    MAX_CHILDREN: 2,
                    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.mothership]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                    WAIT_TO_CYCLE: true
                };
            t % 2 == 0 && (E.TYPE = [exports.drone, {
                AI: {
                    skynet: true
                },
                INDEPENDENT: true,
                LAYER: 10,
                BODY: {
                    FOV: 2
                }
            }]);
            let O = {
                POSITION: [4.3, 3.1, 1.2, 8, 0, S, T[t]],
                PROPERTIES: E
            };
            e.push(O);
        }
        return e;
    })()
};

exports.dominator = {
    PARENT: [exports.genericTank],
    LABEL: "Dominator",
    DANGER: 10,
    SKILL: skillSet({
        rld: 1,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1
    }),
    LEVEL: -1,
    BODY: {
        RESIST: 100,
        SPEED: 1.32,
        ACCELERATION: .8,
        HEALTH: 590,
        DAMAGE: 6,
        PENETRATION: .25,
        FOV: 1,
        PUSHABILITY: 0,
        HETERO: 0,
        SHIELD: base.SHIELD * 1.4
    },
    CONTROLLERS: ["nearestDifferentMaster"],
    DISPLAY_NAME: true,
    TURRETS: [{
        POSITION: [22, 0, 0, 0, 360, 0],
        TYPE: exports.dominationBody
    }],
    CAN_BE_ON_LEADERBOARD: false,
    GIVE_KILL_MESSAGE: false,
    ACCEPTS_SCORE: false,
    HITS_OWN_TYPE: "pushOnlyTeam"
};
exports.gunnerDominator = {
    PARENT: [exports.dominator],
    GUNS: [{
        POSITION: [14.25, 3, 1, 0, -2, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunnerDominator]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [14.25, 3, 1, 0, 2, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunnerDominator]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [15.85, 3, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunnerDominator]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [5, 8.5, -1.6, 6.25, 0, 0, 0]
    }]
};
exports.trapperDominator = {
    PARENT: [exports.dominator],
    FACING_TYPE: 'autospin',
    CONTROLLERS: ['alwaysFire'],
    GUNS: [{
        POSITION: [4, 3.75, 1, 8, 0, 0, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 45, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 45, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 90, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 135, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 135, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 180, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 225, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 225, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 270, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 315, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 315, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }]
};
exports.sanctuary = {
    PARENT: [exports.dominator],
    FACING_TYPE: 'autospin',
    CONTROLLERS: ['alwaysFire'],
    GUNS: [{
        POSITION: [4, 3.75, 1, 8, 0, 0, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 45, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 45, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 90, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 135, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 135, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 180, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 225, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 225, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 270, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 315, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 315, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }],
  TURRETS: [
    {
      POSITION: [8, 0, 0, 0, 360, 1],
      TYPE: [exports.flank, {CONTROLLERS: ['alwaysFire', 'reverseslowspin']}]
    }, {
        POSITION: [22, 0, 0, 0, 360, 0],
        TYPE: exports.dominationBody
    }
  ]
};
exports.sanctuary2 = {
    PARENT: [exports.dominator],
    FACING_TYPE: 'autospin',
    CONTROLLERS: ['alwaysFire'],
    GUNS: [{
        POSITION: [4, 3.75, 1, 8, 0, 0, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 45, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 45, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 90, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 135, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 135, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 180, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 225, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 225, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 270, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }, {
        POSITION: [4, 3.75, 1, 8, 0, 315, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 315, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap
        }
    }],
  TURRETS: [
    {
        POSITION: [22, 0, 0, 0, 360, 0],
        TYPE: exports.dominationBody
    }
  ]
};
exports.bot = {
    AUTO_UPGRADE: "random",
    FACING_TYPE: "looseToTarget",
    //COLOR: 12,
    BODY: {
        SIZE: 10
    },
    NAME: "[AI] ",
    CONTROLLERS: ["nearestDifferentMaster", "mapAltToFire", "minion", "fleeAtLowHealth", "wander"],
    AI: {
        STRAFE: true
    }
};
exports.healBot = {
  FACING_TYPE: "looseToTarget",
  NAME: "[AI] ",
  CONTROLLERS: [
    "nearestSameMaster",
    "mapAltToFire",
    "botMovement",
    "fleeAtLowHealth",
  ],
};
exports.ramBot = {
    AUTO_UPGRADE: "random",
    FACING_TYPE: "looseToTarget",
    //COLOR: 12,
    BODY: {
        SIZE: 10
    },
    NAME: "[AI] ",
    MOTION_TYPE: 'chase',
    CONTROLLERS: ["nearestDifferentMaster", "mapAltToFire", "fleeAtLowHealth", "mapTargetToGoal", "wander"],
    AI: {
        STRAFE: false
    }
};
exports.tagMode = {
    PARENT: [exports.bullet],
    LABEL: "Players"
};

// exports.basic = {
//     PARENT: [exports.genericTank],
//     LABEL: 'Basic',
//     //CONTROLLERS: ['nearestDifferentMaster'],
//     GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
//         POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
//         PROPERTIES: {
//             SHOOT_SETTINGS: combineStats([g.basic]),
//             TYPE: exports.bullet,
//             LABEL: '',                  // def
//             STAT_CALCULATOR: 0,         // def
//             WAIT_TO_CYCLE: false,       // def
//             AUTOFIRE: false,            // def
//             SYNCS_SKILLS: false,        // def         
//             MAX_CHILDREN: 0,            // def  
//             ALT_FIRE: false,            // def 
//             NEGATIVE_RECOIL: false,     // def
//         }, }, 
//     ],
// };

exports.teaser = {
    PARENT: [exports.genericTank],
    LABEL: 'Teaser',
    CUSTOM: true,
  FACING_TYPE: 'locksFacing',
   BODY: {
        FOV: 1.12,
    },    
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,     10,      1.4,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.anni,g.destroy,g.pound,g.swarm,g.battle,g.carrier,g.whatthe,g.doublereload,g.doublereload,g.health4damage]),
            TYPE: exports.swarm,
            LABEL: 'Front Swarmer',      
            STAT_CALCULATOR: gunCalcNames.swarm, 
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  11,     14,      1,      0,      0,      90,      0,   ], 
           }, 
    ],
};
exports.spiky = {
    PARENT: [exports.genericTank],
    BODY: {
      HEALTH: 50,
      DAMAGE: 1.2
    },
    LABEL: "Spike",
    SHAPE: -5,
    DIPMULTI: 0.6,
    SIZE: 7,
    COLOR: 16,
    TYPE: 'miniboss',
    SIZE: 25,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.spiky2 = {
    PARENT: [exports.genericTank],
    BODY: {
      HEALTH: 25,
      DAMAGE: 1
    },
    LABEL: "Spike",
    SHAPE: -3,
    DIPMULTI: 0.6,
    SIZE: 7,
    COLOR: 16,
    TYPE: 'miniboss',
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.spiky3 = {
    PARENT: [exports.genericTank],
    BODY: {
      HEALTH: 150,
      DAMAGE: 2.35
    },
    LABEL: "Spike",
    SHAPE: -6,
    DIPMULTI: 0.6,
    SIZE: 7,
    COLOR: 16,
    TYPE: 'miniboss',
    SIZE: 40,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.spiky4 = {
    PARENT: [exports.genericTank],
    BODY: {
      HEALTH: 430,
      DAMAGE: 6
    },
    LABEL: "Spike",
    SHAPE: -7,
    DIPMULTI: 0.6,
    SIZE: 7,
    COLOR: 16,
    TYPE: 'miniboss',
    SIZE: 60,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.spiky5 = {
    PARENT: [exports.genericTank],
    BODY: {
      HEALTH: 1455,
      DAMAGE: 6
    },
    LABEL: "Spike",
    SHAPE: -8,
    DIPMULTI: 0.6,
    SIZE: 7,
    COLOR: 16,
    TYPE: 'miniboss',
    SIZE: 180,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};
exports.star = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 6
    },
    LABEL: "Super Star",
    CUSTOM: true,
    VALUE: 40000,
    SHAPE: -5,
    DIPMULTI: 0.2,
    SIZE: 7,
    COLOR: 3,
    BODY: {
        DAMAGE: -99999999999999999999,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};

let ctta = []
for (let i = 0.5; i < 9; i++) {
  ctta.push({
    POSITION: [6, 8.5, 0, (360 * i) / 9, 0, 0],
    TYPE: exports.trapTurret
  })
}
exports.kronos = (() => {
  g.kronosMissileTrail = [
    1.35, 1.2, 2, 0.95, 1.3, 1.3, 1.3, 1.2, 1.2, 0.75, 1, 2, 1,
  ];
  exports.kronosMissile = {
    PARENT: [exports.missile],
    LAYER: 12,
    GUNS: [
      {
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 6, 1, 0, -2, 150, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.kronosMissileTrail,
          ]),
          TYPE: [
            exports.bullet,
            {
              PERSISTS_AFTER_DEATH: true,
            },
          ],
          AUTOFIRE: true,
        },
      },
      {
        POSITION: [14, 6, 1, 0, 2, 210, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.kronosMissileTrail,
          ]),
          TYPE: [
            exports.bullet,
            {
              PERSISTS_AFTER_DEATH: true,
            },
          ],
          AUTOFIRE: true,
        },
      },
      {
        POSITION: [14, 6, 1, 0, -2, 90, 0],
      },
      {
        POSITION: [14, 6, 1, 0, 2, 270, 0],
      },
      {
        POSITION: [2, 7, 1.5, 15, 2, 270, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.kronosMissileTrail,
          ]),
          TYPE: [
            exports.trap,
            {
              PERSISTS_AFTER_DEATH: true,
            },
          ],
          AUTOFIRE: true,
        },
      },
      {
        POSITION: [2, 7, 1.5, 15, -2, 90, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.kronosMissileTrail,
          ]),
          TYPE: [
            exports.trap,
            {
              PERSISTS_AFTER_DEATH: true,
            },
          ],
          AUTOFIRE: true,
        },
      },
    ],
  };
  exports.kronosMissileTurret = {
    PARENT: [exports.autoTurret],
    INDEPENDENT: true,
    GUNS: [
      {
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [10, 12, 2, 12, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.pound,
            g.destroy,
            [4, 1, 1, 0.8, 1.5, 1.5, 1, 1.2, 1.2, 1.4, 1, 1, 1],
          ]),
          TYPE: exports.kronosMissile,
        },
      },
      {
        POSITION: [17, 15, 1.5, 0, 0, 0, 0],
      },
    ],
  };
  exports.kronosMissileBody = {
    PARENT: [exports.genericTank],
    LABEL: "",
    SHAPE: 9,
    COLOR: 6,
    SKILL: setBuild("9999999999"),
    CONTROLLERS: ["reverseslowspin"],
    TURRETS: (() => {
      let output = [];
      for (let i = 0; i < 9; i++)
        output.push({
          POSITION: [6, 9, 0, (360 / 9) * i + 360 / 18, 180, 0],
          TYPE: exports.kronosMissileTurret,
        });
      return output;
    })(),
  };
  g.kronosCarrier = [3, 1, 1, 1, 2, 0.7, 1.1, 1, 1, 0.5, 2, 1, 1];
  exports.kronosCarrier = {
    PARENT: [exports.autoTurret],
    STAT_NAMES: statnames.swarm,
    INDEPENDENT: true,
    GUNS: [
      {
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.swarm,
            g.battle,
            g.carrier,
            g.kronosCarrier,
          ]),
          TYPE: [exports.swarm, {LAYER: 12}],
          STAT_CALCULATOR: gunCalcNames.swarm,
        },
      },
      {
        POSITION: [7, 7.5, 0.6, 7, 2, 40, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.swarm,
            g.battle,
            g.carrier,
            g.kronosCarrier,
          ]),
          TYPE: [exports.swarm, {LAYER: 12}],
          STAT_CALCULATOR: gunCalcNames.swarm,
        },
      },
      {
        POSITION: [7, 7.5, 0.6, 7, -2, -40, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.swarm,
            g.battle,
            g.carrier,
            g.kronosCarrier,
          ]),
          TYPE: [exports.swarm, {LAYER: 12}],
          STAT_CALCULATOR: gunCalcNames.swarm,
        },
      },
    ],
  };
  exports.kronosCarrierBody = {
    PARENT: [exports.genericTank],
    LABEL: "",
    SHAPE: 7,
    COLOR: 6,
    SKILL: setBuild("9999999999"),
    CONTROLLERS: ["slowspin"],
    TURRETS: (() => {
      let output = [];
      for (let i = 0; i < 7; i++)
        output.push({
          POSITION: [6, 9, 0, (360 / 7) * i + 360 / 14, 180, 0],
          TYPE: exports.kronosCarrier,
        });
      return output;
    })(),
  };
  g.kronosTriplet = [2.334, 1, 1, 1, 0.9, 0.85, 1.1, 1.25, 1.25, 0.8, 2, 1, 1];
  exports.kronosTriplet = {
    PARENT: [exports.autoTurret],
    INDEPENDENT: true,
    GUNS: [
      {
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 10, 1, 0, 5, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            g.triple,
            g.kronosTriplet,
          ]),
          TYPE: exports.lrbullet,
        },
      },
      {
        POSITION: [18, 10, 1, 0, -5, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            g.triple,
            g.kronosTriplet,
          ]),
          TYPE: exports.lrbullet,
        },
      },
      {
        POSITION: [21, 9, 1.5, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            g.triple,
            g.kronosTriplet,
            g.mach,
          ]),
          TYPE: exports.lrbullet,
        },
      },
    ],
  };
  exports.kronosTripletBody = {
    PARENT: [exports.genericTank],
    LABEL: "",
    SHAPE: 5,
    COLOR: 6,
    SKILL: setBuild("9999999999"),
    CONTROLLERS: ["reverseslowspin"],
    TURRETS: (() => {
      let output = [];
      for (let i = 0; i < 5; i++)
        output.push({
          POSITION: [9, 8, 0, (360 / 5) * i + 360 / 10, 180, 0],
          TYPE: exports.kronosTriplet,
        });
      return output;
    })(),
  };
  return {
    PARENT: [exports.miniboss],
    LABEL: 'Eternal:Kronos',
    NAME: "Kronos",
    COLOR: 6,
    SHAPE: 11,
    SIZE: 125,
    VALUE: 4000000,
    BODY: {
      FOV: 1,
      HEALTH: base.HEALTH * 15 * 14,
      DAMAGE: 5,
      SPEED: 1.15
    },
    TURRETS: (() => {
      let output = [
        {
          /*  SIZE     X       Y     ANGLE    ARC */
          POSITION: [14, 0, 0, 0, 360, 1],
          TYPE: exports.kronosMissileBody,
        },
        {
          POSITION: [10, 0, 0, 0, 360, 1],
          TYPE: exports.kronosCarrierBody,
        },
        {
          POSITION: [6, 0, 0, 0, 360, 1],
          TYPE: exports.kronosTripletBody,
        },
      ];
      for (let i = 0; i < 11; i++)
        output.push({
          POSITION: [5.75, 9.5, 0, (360 / 11) * i + 360 / 22, 0, 0],
          TYPE: exports.trapTurret,
        });
      return output;
    })(),
  };
})();
exports.ragnarok = (() => {
  g.ragnarokGunnerCruiser = [3, 1, 1, 1, 0.7, 0.7, 1.3, 1.5, 1.5, 2, 1, 1, 1];
  exports.ragnarokGunnerCruiser = {
    PARENT: [exports.autoTurret],
    INDEPENDENT: true,
    GUNS: [
      {
        POSITION: [10, 8.5, 0.4, 0, 5.75, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.ragnarokGunnerCruiser]),
          TYPE: [exports.swarm, {LAYER: 12}],
        },
      },
      {
        POSITION: [10, 8.5, 0.4, 0, -5.75, 0, 0.75],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.ragnarokGunnerCruiser]),
          TYPE: [exports.swarm, {LAYER: 12}],
        },
      },
      {
        POSITION: [16, 3.5, 1, 0, 3, 0, 0.25],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            g.ragnarokGunnerCruiser,
          ]),
          TYPE: exports.lrbullet,
        },
      },
      {
        POSITION: [16, 3.5, 1, 0, -3, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            g.ragnarokGunnerCruiser,
          ]),
          TYPE: exports.lrbullet,
        },
      },
    ],
  };
  exports.ragnarokGunnerCruiserBody = {
    PARENT: [exports.genericTank],
    LABEL: "Gunner Cruiser",
    SHAPE: 5,
    SKILL: setBuild("9999999999"),
    CONTROLLERS: ["reverseslowspin"],
    INDEPENDENT: true,
    TURRETS: (() => {
      let output = [];
      for (let i = 0; i < 5; i++)
        output.push({
          POSITION: [8, 9, 0, (360 / 5) * i + 360 / 10, 180, 0],
          TYPE: exports.ragnarokGunnerCruiser,
        });
      return output;
    })(),
  };
  g.ragnarokAutoSmasher = [3, 0, 1, 1, 0.4, 0.4, 1.25, 2, 2, 1.5, 2, 1, 1];
  exports.ragnarokAutoSmasherTurret = {
    PARENT: [exports.autoTurret],
    BODY: {
      FOV: 1,
    },
    SKILL: setBuild("9999999999"),
    INDEPENDENT: true,
    GUNS: [
      {
        POSITION: [20, 6, 1, 0, 5, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.ragnarokAutoSmasher]),
          TYPE: [
            exports.bullet,
            {
              PERSISTS_AFTER_DEATH: true,
            },
          ],
          STAT_CALCULATOR: gunCalcNames.fixedReload,
        },
      },
      {
        POSITION: [20, 6, 1, 0, -5, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.ragnarokAutoSmasher]),
          TYPE: [
            exports.bullet,
            {
              PERSISTS_AFTER_DEATH: true,
            },
          ],
          STAT_CALCULATOR: gunCalcNames.fixedReload,
        },
      },
    ],
  };
  exports.ragnarokAutoSmasher = makeAuto(
    {
      PARENT: [exports.bullet],
      TURRETS: [
        {
          POSITION: [21.5, 0, 0, 0, 360, 0],
          TYPE: exports.smasherBody,
        },
      ],
    },
    "Auto-Smasher",
    {
      type: exports.ragnarokAutoSmasherTurret,
      size: 11,
    }
  );
  exports.ragnarokAutoSmasherLauncher = {
    PARENT: [exports.autoTurret],
    SKILL: setBuild("9999999999"),
    INDEPENDENT: true,
    GUNS: [
      {
        POSITION: [10, 13, -0.5, 9, 0, 0, 0],
      },
      {
        POSITION: [17, 14, 1.4, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.pound,
            g.destroy,
            [4, 1, 1, 0.9, 1.5, 1.5, 1, 1.75, 1.75, 1.5, 1, 1, 1],
          ]),
          TYPE: [exports.ragnarokAutoSmasher, {LAYER: 12}],
        },
      },
    ],
  };
  exports.ragnarokAutoSmasherBody = {
    PARENT: [exports.genericTank],
    LABEL: "Auto Smasher",
    SHAPE: 7,
    SKILL: setBuild("9999999999"),
    CONTROLLERS: ["slowspin"],
    INDEPENDENT: true,
    TURRETS: (() => {
      let output = [];
      for (let i = 0; i < 7; i++)
        output.push({
          POSITION: [6, 9, 0, (360 / 7) * i + 360 / 14, 90, 0],
          TYPE: exports.ragnarokAutoSmasherLauncher,
        });
      return output;
    })(),
  };
  exports.ragnarokGemBody = {
    PARENT: [exports.genericTank],
    LABEL: "Gem",
    SHAPE: 9,
    MAX_CHILDREN: 18,
    CONTROLLERS: ["reverseslowspin"],
    INDEPENDENT: true,
    GUNS: (() => {
      exports.ragnarokGem = {
        PARENT: [exports.drone],
        SHAPE: 6,
      };
      let output = [];
      for (let i = 0; i < 9; i++)
        output.push({
          POSITION: [3.5, 6.5, 0.5, 7.5, 0, (360 / 9) * i + 360 / 18, 2],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([
              g.drone,
              [2, 1, 1, 0.5, 3, 3, 1, 0.3, 0.2, 1, 1, 1, 1],
            ]),
            TYPE: [
              exports.ragnarokGem,
              {
                INDEPENDENT: true,
                DRAW_HEALTH: true,
                BODY: {
                  FOV: 1.175,
                },
              },
            ],
            AUTOFIRE: true,
            SYNC_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
          },
        });
      return output;
    })(),
  };
  return {
    PARENT: [exports.miniboss],
    LABEL: 'Celestial:Ragnarok',
    NAME: "Ragnarok",
    COLOR: 0,
    SHAPE: 11,
    DANGER: 100,
    VALUE: 4000000,
    BODY: {
      FOV: 1,
      HEALTH: base.HEALTH * 15 * 14,
      DAMAGE: 5,
      SPEED: 1.15
    },
    SIZE: 125,
    TURRETS: (() => {
      let output = [
        {
          POSITION: [17, 0, 0, 0, 360, 1],
          TYPE: [
            exports.ragnarokGemBody,
            {
              COLOR: 0,
            },
          ],
        },
        {
          POSITION: [12, 0, 0, 0, 360, 1],
          TYPE: [
            exports.ragnarokAutoSmasherBody,
            {
              COLOR: 0,
            },
          ],
        },
        {
          POSITION: [7, 0, 0, 0, 360, 1],
          TYPE: [
            exports.ragnarokGunnerCruiserBody,
            {
              COLOR: 0,
            },
          ],
        },
      ];
      for (let i = 0; i < 11; i++)
        output.push({
          POSITION: [4, 9, 0, (360 / 11) * i + 360 / 22, 0, 0],
          TYPE: exports.trapTurret,
        });
      return output;
    })(),
  };
})();
exports.fiolnirBeekBullet = {
  PARENT: [exports.bullet],
  TURRETS: [
    {
      POSITION: [12, 0, 0, 0, 360, 1],
      TYPE: exports.autoTurret,
      SHOOT_SETTINGS: combineStats([g.basic, g.power]),
    },
  ],
};
exports.fiolnirBeekeeper = {
  PARENT: [exports.autoTurret],
  DANGER: 6,
  BODY: {
    FOV: 3,
  },
  LABEL: "",
  COLOR: 17,
  CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [12, 3, 1, 0, -6, -7, 0.25],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.double_damage, g.double_damage, g.arty, g.lessreload]),
        TYPE: exports.bee,
        LABEL: "Secondary",
      },
    },
    {
      POSITION: [12, 3, 1, 0, 6, 7, 0.75],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.double_damage, g.double_damage, g.arty, g.lessreload]),
        TYPE: exports.bee,
        LABEL: "Secondary",
      },
    },
    {
      POSITION: [19, 12, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.pound,
          g.arty,
          g.morereload,
          g.morereload,
          g.destroy,
          g.anni,
          g.anni,
          g.power, 
          g.double_damage, 
          g.double_damage
        ]),
        TYPE: exports.fiolnirBeekBullet,
        LABEL: "Heavy",
      },
    },
  ],
};
exports.fiolnirSplitCruiser = {
  PARENT: [exports.autoTurret],
  LABEL: "(Auto turret) skimmer ",
  /*  DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',*/
  BODY: {
    FOV: base.FOV * 1.3,
  },
  CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
  COLOR: 17,
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [7, 7.5, 0.6, 7, 2, 20, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.double_damage, g.double_damage, g.basic]),
        TYPE: exports.swarm,
        COLOR: 6
      },
    },
    {
      POSITION: [7, 7.5, 0.6, 7, -2, -20, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.double_damage, g.double_damage, g.basic]),
        TYPE: exports.swarm,
      },
    },
  ],
};
exports.alvisseggswarm = {
  PARENT: [exports.swarm],
  SHAPE: 0,
  COLOR: 6,
};
exports.alvissmissile = {
  PARENT: [exports.missile],
  LABEL: "alviss missile",
  COLOR: 6,
  GUNS: [
    {
      POSITION: [17, 8, 1, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: exports.bullet,
        AUTOFIRE: true,
      },
    },
  ],
};
exports.alvissturret1 = {
  PARENT: [exports.autoTurret],
  LABEL: "Alviss missile turret",
  GUNS: [
    {
      POSITION: [19, 6, 1.3, 0, 0, 0, 0],
    },
    {
      POSITION: [17, 12, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.pound,
          g.destroy,
          g.anni,
          g.power,
          g.double_damage,
          g.double_damage,
          g.quadro_damage,
        ]),
        TYPE: exports.alvissmissile,
      },
    },
  ],
};
exports.alvissturret2 = {
  PARENT: [exports.autoTurret],
  LABEL: "Alviss egg swarm turret",
  GUNS: [
    {
      POSITION: [14, 10, 0.6, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.power]),
        TYPE: exports.alvisseggswarm,
      },
    },
  ],
};
exports.alvissbody1 = {
  PARENT: [exports.genericTank],
  LABEL: "",
  CONTROLLERS: ["slowspin"],
  SHAPE: 5,
  COLOR: 17,
  TURRETS: [
    {
      POSITION: [8, 8, 0, (360 * 1.5) / 5, 180, 0],
      TYPE: exports.alvissturret1,
    },
    {
      POSITION: [8, 8, 0, (360 * 2.5) / 5, 180, 0],
      TYPE: exports.alvissturret1,
    },
    {
      POSITION: [8, 8, 0, (360 * 3.5) / 5, 180, 0],
      TYPE: exports.alvissturret1,
    },
    {
      POSITION: [8, 8, 0, (360 * 4.5) / 5, 180, 0],
      TYPE: exports.alvissturret1,
    },
    {
      POSITION: [8, 8, 0, (360 * 5.5) / 5, 180, 0],
      TYPE: exports.alvissturret1,
    },
  ],
};
exports.alvissbody2 = {
  PARENT: [exports.genericTank],
  LABEL: "",
  CONTROLLERS: ["reverseslowspin"],
  SHAPE: 7,
  COLOR: 17,
  TURRETS: [
    {
      POSITION: [8, 8, 0, (360 * 1.5) / 7, 180, 0],
      TYPE: exports.alvissturret2,
    },
    {
      POSITION: [8, 8, 0, (360 * 2.5) / 7, 180, 0],
      TYPE: exports.alvissturret2,
    },
    {
      POSITION: [8, 8, 0, (360 * 3.5) / 7, 180, 0],
      TYPE: exports.alvissturret2,
    },
    {
      POSITION: [8, 8, 0, (360 * 4.5) / 7, 180, 0],
      TYPE: exports.alvissturret2,
    },
    {
      POSITION: [8, 8, 0, (360 * 5.5) / 7, 180, 0],
      TYPE: exports.alvissturret2,
    },
    {
      POSITION: [8, 8, 0, (360 * 6.5) / 7, 180, 0],
      TYPE: exports.alvissturret2,
    },
    {
      POSITION: [8, 8, 0, (360 * 7.5) / 7, 180, 0],
      TYPE: exports.alvissturret2,
    },
  ],
};
exports.alviss = {
  PARENT: [exports.miniboss],
  LABEL: "Rogue Celestial",
  NAME: "Alviss",
  COLOR: 17,
  SHAPE: 9,
  VALUE: 1000000,
  SIZE: 40,
  BODY: {
    HEALTH: base.HEALTH * 15 * 2,
    DAMAGE: base.DAMAGE * 5,
    SPEED: 0.6,
  },
  TURRETS: [
    ...ctta,
    {
      POSITION: [15, 0, 0, 0, 360, 1],
      TYPE: exports.alvissbody2,
    },
    {
      POSITION: [9.5, 0, 0, 0, 360, 1],
      TYPE: exports.alvissbody1,
    },
  ],
};
exports.tyrdrone = {
    PARENT: [exports.swarm],
    BODY: {
        FOV: 0.5,
        SPEED: 1.5,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 3,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
        RANGE: 400
    },
    INDEPENDENT: true,
    SHAPE: 0,
    GUNS: [ {
      POSITION: [16, 10, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
        TYPE: exports.bullet, AUTOFIRE: true
      }
    } ]
};
exports.tyrfactory = {
  PARENT: [exports.autoTurret],
  LABEL: '',
  BODY: {
    FOV: 3
  },
  GUNS: [
    {
      POSITION: [15, 11, 0.6, 0, 0, 0, 0]
    },{
      POSITION: [3, 11, 1, 15, 0, 0, 2],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.power]),
        TYPE: exports.tyrdrone, STAT_CALUCLATOR: gunCalcNames.swarm, SYNC_STATS: true,
      }
    }
  ]
}
exports.tyrbody1 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 5,
  COLOR: 17,
  SKILL: setBuild("9999999999"),
  CONTROLLERS: ['slowspin'],
  TURRETS: []
}
for (let i = 0; i < 5; i++) {
    exports.tyrbody1.TURRETS.push({
      POSITION: [8, 8, 0, (360 * i) / 5 + 36, 180, 0],
      TYPE: exports.auto4gun
    })
}
exports.tyrbody2 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 7,
  COLOR: 17,
  SKILL: setBuild("9999999999"),
  CONTROLLERS: ['reverseslowspin'],
  TURRETS: []
}
for (let i = 0; i < 7; i++) {
    exports.tyrbody2.TURRETS.push({
      POSITION: [8, 8, 0, (360 * i) / 7 + 25.5, 180, 0],
      TYPE: exports.tyrfactory
    })
}
exports.tyr = {
  PARENT: [exports.miniboss],
  LABEL: 'Rogue Celestial',
  NAME: 'Tyr',
  SIZE: 40,
  VALUE: 1000000,
  SHAPE: 9,
  COLOR: 17,
  BODY: {
    SPEED: base.SPEED * 0.06,
    HEALTH: base.HEALTH * 15 * 2,
    DAMAGE: base.DAMAGE * 5,
  },
  TURRETS: [
    ...ctta,
    {
      POSITION: [15, 0, 0, 0, 360, 1],
      TYPE: exports.tyrbody2
    },
    {
      POSITION: [9.5, 0, 0, 0, 360, 1],
      TYPE: exports.tyrbody1
    }
  ]
}
exports.zaphkielskimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 5,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    LABEL: '',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
             }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
               PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload, g.lessreload, g.quadro_damage, g.double_damage, g.triple_damage, g.quadro_damage, g.quadro_damage]),
                TYPE: exports.hypermissile,
            },  },
    ],
};
exports.zaphkielbody1 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 5,
  COLOR: 2,
  CONTROLLERS: ['slowspin'],
  TURRETS: []
}
for (let i = 0.5; i < 5; i++) {
  exports.zaphkielbody1.TURRETS.push({
    POSITION: [8, 8, 0, (360 * i) / 5, 180, 0],
    TYPE: exports.zaphkielskimturret
  })
}
exports.zaphkielbody2 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 7,
  COLOR: 2,
  BODY: {
    FOV: 3
  },
  CONTROLLERS: ['reverseslowspin'],
  GUNS: []
}
for (let i = 0.5; i < 7; i++) {
  exports.zaphkielbody2.GUNS.push({
    POSITION: [11.5, 6, 1.3, 0, 0, (360 * i) / 7, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, [5, 1, 1, 1, 1.2, 1.33, 1.02, 0.5, 1, 1, 1, 1, 1]]),
      TYPE: [exports.drone, {INDEPENDENT: true, BODY: {SPEED: 1.3, FOV: 1.3}}], AUTOFIRE: true, MAX_CHILDREN: 4
    }
  })
}
exports.zaphkiel = { // o
  PARENT: [exports.miniboss],
  LABEL: 'Celestial',
  NAME: "Zaphkiel",
  SIZE: 40,
  COLOR: 2,
  SHAPE: 9,
  VALUE: 1000000,
  BODY: {
    HEALTH: base.HEALTH * 15 * 2,
    DAMAGE: base.DAMAGE * 5,
    SPEED: 1.2,
  },
  TURRETS: [
    ...ctta,
    {
      POSITION: [15, 0, 0, 0, 360, 1],
      TYPE: exports.zaphkielbody2
    }, {
      POSITION: [9.5, 0, 0, 0, 360, 1],
      TYPE: exports.zaphkielbody1
    }
  ]
}
exports.nyxminion = {
  PARENT: [exports.minion],
  LABEL: "Nyx minion",
  INDEPENDENT: true,
};
exports.snaketer = {
  PARENT: [exports.bullet],
  LABEL: "Rocketeer Bullet",
  BODY: {
    RANGE: 100,
  },
  GUNS: [
    {
      POSITION: [6, 12, 1.2, 8, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.skim,
          g.doublereload,
          g.lowpower,
          g.muchmorerecoil,
          g.morespeed,
          g.morespeed,
        ]),
        TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true }],
        AUTOFIRE: true,
        NEGATIVE_RECOIL: false,
        STAT_CALUCLATOR: gunCalcNames.thruster,
      },
    },
  ],
};
exports.rocket = {
  PARENT: [exports.autoTurret],
  LABEL: "Rocketeer",
  DANGER: 7,
  BODY: {
    ACCELERATION: base.ACCEL * 0.7,
    SPEED: base.SPEED * 0.8,
    FOV: base.FOV * 1.3,
  },
  GUNS: [
    {
      POSITION: [10.3, 10, 1.2, 9.5, 0, 0, 0],
    },
    {
      POSITION: [16.5, 12, -1.5, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.power, g.double_damage, g.double_damage, g.lessreload]),
        TYPE: exports.snaketer,
      },
    },
  ],
};
exports.nyxbody1 = {
  PARENT: [exports.genericTank],
  LABEL: "",
  SHAPE: 5,
  COLOR: 5,
  CONTROLLERS: ["slowspin"],
  TURRETS: [
    {
      POSITION: [8, 8, 0, (360 * 1.5) / 5, 180, 0],
      TYPE: exports.rocket,
    },
    {
      POSITION: [8, 8, 0, (360 * 2.5) / 5, 180, 0],
      TYPE: exports.rocket,
    },
    {
      POSITION: [8, 8, 0, (360 * 3.5) / 5, 180, 0],
      TYPE: exports.rocket,
    },
    {
      POSITION: [8, 8, 0, (360 * 4.5) / 5, 180, 0],
      TYPE: exports.rocket,
    },
    {
      POSITION: [8, 8, 0, (360 * 5.5) / 5, 180, 0],
      TYPE: exports.rocket,
    },
  ],
};
exports.nyxbody2 = {
  PARENT: [exports.genericTank],
  LABEL: "",
  SHAPE: 7,
  COLOR: 5,
  MAX_CHILDREN: 14,
  CONTROLLERS: ["reverseslowspin"],
  GUNS: [
    {
      POSITION: [11.5, 17, 0.4, 0, 0, (360 * 1.5) / 7, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.factory,
          g.lowpower,
          g.fast,
          g.halfreload,
          g.smallBullet,
          g.double_health,
          g.quad_health,
          g.quad_health,
          [1,1,1,0.4,1,1,1,1,1,1,1,1,1]
        ]),
        TYPE: exports.nyxminion,
        AUTOFIRE: true
      },
    },
    {
      POSITION: [11.5, 17, 0.4, 0, 0, (360 * 2.5) / 7, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.factory,
          g.lowpower,
          g.fast,
          g.halfreload,
          g.smallBullet,
          g.double_health,
          g.quad_health,
          g.quad_health,
          [1,1,1,0.4,1,1,1,1,1,1,1,1,1]
        ]),
        TYPE: exports.nyxminion,
        AUTOFIRE: true
      },
    },
    {
      POSITION: [11.5, 17, 0.4, 0, 0, (360 * 3.5) / 7, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.factory,
          g.lowpower,
          g.fast,
          g.halfreload,
          g.smallBullet,
          g.double_health,
          g.quad_health,
          g.quad_health,
          [1,1,1,0.4,1,1,1,1,1,1,1,1,1]
        ]),
        TYPE: exports.nyxminion,
        AUTOFIRE: true
      },
    },
    {
      POSITION: [11.5, 17, 0.4, 0, 0, (360 * 4.5) / 7, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.factory,
          g.lowpower,
          g.fast,
          g.halfreload,
          g.smallBullet,
          g.double_health,
          g.quad_health,
          g.quad_health,
          [1,1,1,0.4,1,1,1,1,1,1,1,1,1]
        ]),
        TYPE: exports.nyxminion,
        AUTOFIRE: true
      },
    },
    {
      POSITION: [11.5, 17, 0.4, 0, 0, (360 * 5.5) / 7, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.factory,
          g.lowpower,
          g.fast,
          g.halfreload,
          g.smallBullet,
          g.double_health,
          g.quad_health,
          g.quad_health,
          [1,1,1,0.4,1,1,1,1,1,1,1,1,1]
        ]),
        TYPE: exports.nyxminion,
        AUTOFIRE: true
      },
    },
    {
      POSITION: [11.5, 17, 0.4, 0, 0, (360 * 6.5) / 7, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.factory, 
          g.lowpower,
          g.fast,
          g.halfreload,
          g.double_health,
          g.quad_health,
          g.quad_health,
          [1,1,1,0.4,1,1,1,1,1,1,1,1,1]
        ]),
        TYPE: exports.nyxminion,
        AUTOFIRE: true
      },
    },
    {
      POSITION: [11.5, 17, 0.4, 0, 0, (360 * 7.5) / 7, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.factory,
          g.lowpower,
          g.fast,
          g.halfreload,
          g.smallBullet,
          g.double_health,
          g.quad_health,
          g.quad_health,
          [1,1,1,0.4,1,1,1,1,1,1,1,1,1]
        ]),
        TYPE: exports.nyxminion,
        AUTOFIRE: true
      },
    },
  ],
};
exports.nyx = {
  PARENT: [exports.miniboss],
  LABEL: "Celestial",
  NAME: "Nyx",
  SHAPE: 9,
  COLOR: 5,
  VALUE: 1000000,
  SIZE: 40,
  BODY: {
    HEALTH: base.HEALTH * 15 * 2,
    DAMAGE: base.DAMAGE * 4,
    SPEED: base.SPEED * 0.06,
  },
  TURRETS: [
    ...ctta,
    {
      POSITION: [15, 0, 0, 0, 360, 1],
      TYPE: exports.nyxbody2,
    },
    {
      POSITION: [9.5, 0, 0, 0, 360, 1],
      TYPE: exports.nyxbody1,
    },
  ],
};
exports.hyperspinmissile = {
  PARENT: [exports.bullet],
  LABEL: "Missile",
  INDEPENDENT: !0,
  BODY: {
    RANGE: 120,
  },
  FACING_TYPE: "theia",
  GUNS: [
    {
      POSITION: [14, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        AUTOFIRE: !0,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.skim,
          g.doublereload,
          g.lowpower,
          g.morereload,
          g.morespeed,
        ]),
        TYPE: [
          exports.bullet,
          {
            PERSISTS_AFTER_DEATH: !0,
          },
        ],
        STAT_CALCULATOR: gunCalcNames.thruster,
      },
    },
    {
      POSITION: [14, 8, 1, 0, 0, 180, 0],
      PROPERTIES: {
        AUTOFIRE: !0,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.skim,
          g.doublereload,
          g.lowpower,
          g.morereload,
          g.morespeed,
        ]),
        TYPE: [
          exports.bullet,
          {
            PERSISTS_AFTER_DEATH: !0,
          },
        ],
        STAT_CALCULATOR: gunCalcNames.thruster,
      },
    },
    {
      POSITION: [14, 8, 1, 0, 0, 90, 0],
      PROPERTIES: {
        AUTOFIRE: !0,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.skim,
          g.doublereload,
          g.lowpower,
          g.morereload,
          g.morespeed,
        ]),
        TYPE: [
          exports.bullet,
          {
            PERSISTS_AFTER_DEATH: !0,
          },
        ],
        STAT_CALCULATOR: gunCalcNames.thruster,
      },
    },
    {
      POSITION: [14, 8, 1, 0, 0, 270, 0],
      PROPERTIES: {
        AUTOFIRE: !0,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.skim,
          g.doublereload,
          g.lowpower,
          g.morereload,
          g.morespeed,
        ]),
        TYPE: [
          exports.bullet,
          {
            PERSISTS_AFTER_DEATH: !0,
          },
        ],
        STAT_CALCULATOR: gunCalcNames.thruster,
      },
    },
  ],
};
exports.twisterTurret = {
  PARENT: [exports.genericTank],
  LABEL: "Twister",
  BODY: {
    FOV: 2,
  },
  COLOR: 13,
  CONTROLLERS: [
    "canRepel",
    "onlyAcceptInArc",
    "mapAltToFire",
    "nearestDifferentMaster",
  ],
  GUNS: [
    {
      POSITION: [10, 13, -0.5, 9, 0, 0, 0],
    },
    {
      POSITION: [17, 14, -1.4, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.pound,
          g.arty,
          g.arty,
          g.skim,
          g.morespeed,
          g.halfreload,
          g.halfreload,
          g.power
        ]),
        TYPE: exports.hyperspinmissile,
        STAT_CALCULATOR: gunCalcNames.sustained,
      },
    },
  ],
};
exports.theiaTwisterTurret = {
  PARENT: [exports.twisterTurret],
  COLOR: 16,
};
exports.theiaLowerBody = {
  LABEL: "",
  CONTROLLERS: ["reverseslowspin"],
  COLOR: 13,
  SIZE: 100,
  SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  SHAPE: 7,
  FOV: 1,
  FACING_TYPE: "autospin",
  MAX_CHILDREN: 35,
  GUNS: [
    {
      POSITION: [3.6, 6, 1.4, 8, 0, 26, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.doublereload, g.morereload]),
        TYPE: [exports.sunchip, {INDEPENDENT: true}],
        AUTOFIRE: true,
        WAIT_TO_CYCLE: true,
        SYNCS_SKILLS: true,
      },
    },
    {
      POSITION: [3.6, 6, 1.4, 8, 0, 77, .25],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.doublereload, g.morereload]),
        TYPE: [exports.sunchip, {INDEPENDENT: true}],
        AUTOFIRE: true,
        WAIT_TO_CYCLE: true,
        SYNCS_SKILLS: true,
      },
    },
    {
      POSITION: [3.6, 6, 1.4, 8, 0, 129, .5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.doublereload, g.morereload]),
        TYPE: [exports.sunchip, {INDEPENDENT: true}],
        AUTOFIRE: true,
        WAIT_TO_CYCLE: true,
        SYNCS_SKILLS: true,
      },
    },
    {
      POSITION: [3.6, 6, 1.4, 8, 0, 180, .75],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.doublereload, g.morereload]),
        TYPE: [exports.sunchip, {INDEPENDENT: true}],
        AUTOFIRE: true,
        WAIT_TO_CYCLE: true,
        SYNCS_SKILLS: true,
      },
    },
    {
      POSITION: [3.6, 6, 1.4, 8, 0, 231, 1],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.doublereload, g.morereload]),
        TYPE: [exports.sunchip, {INDEPENDENT: true}],
        AUTOFIRE: true,
        WAIT_TO_CYCLE: true,
        SYNCS_SKILLS: true,
      },
    },
    {
      POSITION: [3.6, 6, 1.4, 8, 0, 282, 1.25],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.doublereload, g.morereload]),
        TYPE: [exports.sunchip, {INDEPENDENT: true}],
        AUTOFIRE: true,
        WAIT_TO_CYCLE: true,
        SYNCS_SKILLS: true,
      },
    },
    {
      POSITION: [3.6, 6, 1.4, 8, 0, 333, 1.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.doublereload, g.morereload]),
        TYPE: [exports.sunchip, {INDEPENDENT: true}],
        AUTOFIRE: true,
        WAIT_TO_CYCLE: true,
        SYNCS_SKILLS: true,
      },
    },
  ],
};
exports.theiaUpperBody = {
  LABEL: "",
  CONTROLLERS: ["slowspin"],
  AUTOSPIN: true,
  COLOR: 13,
  SIZE: 100,
  SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  MAX_CHILDREN: 28,
  SHAPE: 5,
  INDEPENDENT: true,
  TURRETS: [
    {
      /*********  SIZE     X       Y     ANGLE    ARC */
      POSITION: [10, 7.5, 0, 35, 90, 0],
      TYPE: exports.theiaTwisterTurret,
    },
    {
      POSITION: [10, 7.5, 0, 110, 90, 0],
      TYPE: exports.theiaTwisterTurret,
    },
    {
      POSITION: [10, 7.5, 0, 180, 90, 0],
      TYPE: exports.theiaTwisterTurret,
    },
    {
      POSITION: [10, 7.5, 0, 252, 90, 0],
      TYPE: exports.theiaTwisterTurret,
    },
    {
      POSITION: [10, 7.5, 0, 325, 90, 0],
      TYPE: exports.theiaTwisterTurret,
    },
  ],
};
exports.theia = {
  PARENT: [exports.miniboss],
  LABEL: "Celestial",
  NAME: "Theia",
  SIZE: 40,
  SHAPE: 9,
  BODY: {
    HEALTH: base.HEALTH * 15 * 2,
    DAMAGE: base.DAMAGE * 5,
    SPEED: 1.2,
  },
  COLOR: 13,
  VALUE: 1000000,
  TURRETS: [
    ...ctta,
    {
      POSITION: [15, 0, 0, 0, 360, 1],
      TYPE: exports.theiaLowerBody,
    },
    {
      POSITION: [9.5, 0, 0, 0, 360, 1],
      TYPE: exports.theiaUpperBody,
    },
  ],
};
exports.paladinhiveshoot = {
  PARENT: [exports.autoTurret],
  LABEL: "",
  HAS_NO_RECOIL: true,
  BODY: {
    FOV: base.FOV * 1.9,
  },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [14, 14, -1.2, 5, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.pound,
          g.destroy,
          g.anni,
          g.power,
          g.halfreload,
          g.power,
          g.power,
          g.double_damage,
          g.double_damage,
          g.quadro_damage,
          g.quadro_damage,
          g.hive,
        ]),
        TYPE: [exports.hive, { MOTION_TYPE: "slowdown" }],
      },
    },
    {
      POSITION: [15, 12, 1, 5, 0, 0, 0],
    },
  ],
};
exports.paladinbody1 = {
  PARENT: [exports.genericTank],
  LABEL: "",
  CONTROLLERS: ["slowspin"],
  SHAPE: 5,
  COLOR: 14,
  TURRETS: [],
};
for (let i = 0; i < 5; i++) {
  exports.paladinbody1.TURRETS.push({
    POSITION: [8, 8, 0, (360 * i) / 5 + 360 / 5 / 2, 180, 0],
    TYPE: exports.paladinhiveshoot,
  });
}
exports.paladinbody2 = {
  PARENT: [exports.genericTank],
  LABEL: "",
  HAS_NO_RECOIL: true,
  CONTROLLERS: ["reverseslowspin"],
  SHAPE: 7,
  COLOR: 14,
  GUNS: [],
};
for (let i = 0; i < 7; i++) {
  exports.paladinbody2.GUNS.push({
    POSITION: [12, 6, 1.4, 0, 0, (360 * i) / 7 + 360 / 7 / 2, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([
        g.drone,
        g.double_damage,
        g.over,
        g.halfreload,
      ]),
      TYPE: exports.paladindrone,
      AUTOFIRE: true,
      MAX_CHILDREN: 5,
    },
  });
}
exports.paladin = {
  PARENT: [exports.miniboss],
  LABEL: "Celestial",
  NAME: "Paladin",
  SIZE: 40,
  SHAPE: 9,
  BODY: {
    HEALTH: base.HEALTH * 15 * 2,
    DAMAGE: base.DAMAGE * 5,
    SPEED: 1.35,
  },
  COLOR: 14,
  VALUE: 1000000,
  TURRETS: [
    ...ctta,
    {
      POSITION: [15, 0, 0, 0, 360, 1],
      TYPE: exports.paladinbody2,
    },
    {
      POSITION: [9.5, 0, 0, 0, 360, 1],
      TYPE: exports.paladinbody1,
    },
  ],
};
exports.freyjaauto4gun = {
  PARENT: [exports.genericTank],
  LABEL: "",
  BODY: {
    FOV: 2,
  },
  CONTROLLERS: [
    "canRepel",
    "onlyAcceptInArc",
    "mapAltToFire",
    "nearestDifferentMaster",
  ],
  COLOR: 16,
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [16, 4, 1, 0, -3.5, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.power,
          g.turret,
        ]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [16, 4, 1, 0, 3.5, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.power,
          g.turret,
        ]),
        TYPE: exports.bullet,
      },
    },
  ],
};
exports.freyjacruiser = {
  PARENT: [exports.autoTurret],
  LABEL: "Cruiser",
  DANGER: 6,
  FACING_TYPE: "locksFacing",
  STAT_NAMES: statnames.swarm,
  BODY: {
    ACCELERATION: base.ACCEL * 0.75,
    FOV: base.FOV * 1.2,
  },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.swarm,
          g.power
        ]),
        TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm,
      },
    },
    {
      POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.swarm,
          g.power,
        ]),
        TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm,
      },
    },
  ],
};
exports.freyjabody1 = {
  PARENT: [exports.genericTank],
  LABEL: "",
  SHAPE: 5,
  COLOR: 1,
  SKILL: setBuild("9999999999"),
  CONTROLLERS: ["slowspin"],
  TURRETS: [],
};
for (let i = 0; i < 5; i++) {
  exports.freyjabody1.TURRETS.push({
    POSITION: [8, 8, 0, (360 * i) / 5 + 360 / 5 / 2, 180, 0],
    TYPE: exports.freyjaauto4gun,
  });
}
exports.freyjabody2 = {
  PARENT: [exports.genericTank],
  LABEL: "",
  SHAPE: 7,
  COLOR: 1,
  SKILL: setBuild("9999999999"),
  CONTROLLERS: ["reverseslowspin"],
  TURRETS: [],
};
for (let i = 0; i < 7; i++) {
  exports.freyjabody2.TURRETS.push({
    POSITION: [8, 8.5, 0, (360 * i) / 7 + 360 / 7 / 2, 180, 0],
    TYPE: exports.freyjacruiser,
  });
}
exports.freyja = {
  PARENT: [exports.miniboss],
  LABEL: "Celestial",
  NAME: "Freyja",
  VALUE: 1000000,
  SHAPE: 9,
  SIZE: 40,
  COLOR: 1,
  BODY: {
    HEALTH: base.HEALTH * 15 * 2,
    DAMAGE: base.DAMAGE * 5,
    SPEED: 1.5,
  },
  TURRETS: [
    ...ctta,
    {
      POSITION: [15, 0, 0, 0, 360, 1],
      TYPE: exports.freyjabody2,
    },
    {
      POSITION: [9.5, 0, 0, 0, 360, 1],
      TYPE: exports.freyjabody1,
    },
  ],
};
exports.ganymede = (() => {
  exports.ganymede_bee_gun = {
    PARENT: [exports.autoTurret],
    LABEL: '',
    GUNS: [
      {
        POSITION: [13, 12, 0.6, 0, 2, 20, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.power]),
          TYPE: exports.bee,
          COLOR_OVERRIDE: 42
        }
      },
      {
        POSITION: [13, 12, 0.6, 0, -2, -20, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.power]),
          TYPE: exports.bee,
          COLOR_OVERRIDE: 42
        }
      }
    ]
  }
  exports.ganymedebody1 = {
    PARENT: [exports.genericTank],
    SHAPE: 5,
    COLOR: 43,
    SKILL: setBuild("9999999999"),
    CONTROLLERS: ['slowspin'],
    TURRETS: (()=> {
      var tr = []
      for (let i = 0.5; i < 5; i++) {
        tr.push({
          POSITION: [8, 8, 0, (360 * i) / 5, 180, 0],
          TYPE: exports.freyjacruiser
        })
      }
      return tr
    })()
  }
  exports.ganymedebody2 = {
    PARENT: [exports.genericTank],
    SHAPE: 7,
    COLOR: 42,
    SKILL: setBuild("9999990999"),
    CONTROLLERS: ['reverseslowspin'],
    TURRETS: (()=> {
      var tr = []
      for (let i = 0.5; i < 7; i++) {
        tr.push({
          POSITION: [8, 8, 0, (360 * i) / 7, 180, 0],
          TYPE: exports.ganymede_bee_gun
        })
      }
      return tr
    })()
  }
  return {
    PARENT: [exports.miniboss],
    LABEL: 'Celestial',
    NAME: 'Ganymede',
    COLOR: 43,
    SHAPE: 9,
    VALUE: 1E6,
    SIZE: 40,
    BODY: {
      HEALTH: base.HEALTH * 15 * 2,
      DAMAGE: base.DAMAGE * 5, 
      SPEED: 1.3,
    },
    TURRETS: [
      ...ctta,
      {
        POSITION: [15, 0, 0, 0, 360, 1],
        TYPE: exports.ganymedebody2
      },
      {
        POSITION: [9.5, 0, 0, 0, 360, 1],
        TYPE: exports.ganymedebody1
      }
    ]
  }
})()
exports.enyo = (() => {
  exports.enyotr = {
    PARENT: [exports.autoTurret],
    LABEL: '',
    SKILL: setBuild("9999999999"),
    GUNS: (()=> {
      var gs = []
      exports.dual.GUNS.forEach(e=> {
        gs.push({
          POSITION: [
            e.POSITION[0],
            e.POSITION[1],
            e.POSITION[2],
            e.POSITION[3],
            e.POSITION[4],
            e.POSITION[5],
            e.POSITION[6],
          ],
          PROPERTIES: e.PROPERTIES
        })
      })
      return gs
    })()
  }
  exports.enyobody1 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 5,
    SKILL: setBuild("9999999999"),
    COLOR: "#F0A899",
    CONTROLLERS: ['slowspin'],
    TURRETS: (()=> {
      var tr = []
      for (let i = 0.5; i < 5; i++) {
        tr.push({
          POSITION: [8, 8, 0, (360 * i) / 5, 90, 0],
          TYPE: exports.enyotr
        })
      }
      return tr
    })()
  }
  exports.enyobody2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 7,
    SKILL: setBuild("9999999999"),
    COLOR: "#F0A899",
    CONTROLLERS: ['reverseslowspin'],
    TURRETS: (()=> {
      var tr = []
      for (let i = 0.5; i < 7; i++) {
        tr.push({
          POSITION: [8, 8, 0, (360 * i) / 7, 90, 0],
          TYPE: exports.autoTurret
        })
      }
      return tr
    })()
  }
  return {
    PARENT: [exports.miniboss],
    LABEL: "Celestial",
    NAME: "Enyo",
    VALUE: 1000000,
    SHAPE: 9,
    CUSTON: true,
    SIZE: 40,
    COLOR: "#F0A899",
    BODY: {
      HEALTH: base.HEALTH * 15 * 2,
      DAMAGE: base.DAMAGE * 5, 
      SPEED: 1.3,
    },
    TURRETS: [
      ...ctta,
      {
        POSITION: [15, 0, 0, 0, 360, 1],
        TYPE: exports.enyobody2
      },
      {
        POSITION: [9.5, 0, 0, 0, 360, 1],
        TYPE: exports.enyobody1
      }
    ]
  }
})()
exports.ridan = (() => {
  exports.ridandrone = {
    PARENT: [exports.sunchip],
    SHAPE: 4,
    INDEPENDENT: true,
    BODY: {
      HEALTH: 4,
      DAMAGE: 2,
      SPEED: 1.3
    }
  }
  exports.ridanlayer1 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 42,
    SHAPE: 5,
    SKILL: setBuild("9999990999"),
    CONTROLLERS: ['reverseslowspin'],
    TURRETS: (()=> {
      let tr = []
      for (let i = 0.5; i < 5; i++) {
        tr.push({
          POSITION: [8, 8, 0, (360 * i) / 5, 110, 0],
          TYPE: [exports.autoTurret, {PARENT: [exports.spread], BODY: {FOV: 3}}]
        })
      }
      return tr
    })()
  }
  exports.ridanlayer3 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 42,
    SHAPE: 9,
    SKILL: setBuild("9999990999"),
    CONTROLLERS: ['reverseslowspin'],
    TURRETS: (()=> {
      let tr = []
      for (let i = 0.5; i < 9; i++) {
        tr.push({
          POSITION: [5, 9, 0, (360 * i) / 9, 110, 0],
          TYPE: [exports.autoTurret, {PARENT: [exports.spray], BODY: {FOV: 3}}]
        })
      }
      return tr
    })()
  }
  exports.ridanlayer2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 43,
    SHAPE: 7,
    SKILL: setBuild("9999999999"),
    CONTROLLERS: ['slowspin'],
    GUNS: (()=> {
      let gs = []
      for (let i = 0.5; i < 7; i++) {
        gs.push({
          POSITION: [10.6, 6, 1.3, 0, 0, (360 * i) / 7, (1 / i)],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.doublereload]),
            TYPE: exports.ridandrone,
            AUTO_FIRE: true, MAX_CHILDREN: 4
          }
        })
      }
      return gs
    })()
  }
  return {
    PARENT: [exports.miniboss],
    SHAPE: 11,
    COLOR: 43,
    SIZE: 125,
    VALUE: 4000000,
    LABEL: 'Eternal',
    NAME: 'Ridan',
    BODY: {
      FOV: 1,
      HEALTH: base.HEALTH * 15 * 14,
      DAMAGE: 5,
      SPEED: 1.15
    },
    TURRETS: (() => {
      let output = [
        {
          /*  SIZE     X       Y     ANGLE    ARC */
          POSITION: [14, 0, 0, 0, 360, 1],
          TYPE: exports.ridanlayer3,
        },
        {
          POSITION: [10, 0, 0, 0, 360, 1],
          TYPE: exports.ridanlayer2,
        },
        {
          POSITION: [6, 0, 0, 0, 360, 1],
          TYPE: exports.ridanlayer1,
        },
      ];
      for (let i = 0; i < 11; i++)
        output.push({
          POSITION: [5.75, 9.5, 0, (360 / 11) * i + 360 / 22, 0, 0],
          TYPE: exports.trapTurret,
        });
      return output;
    })(),
  }
})()
exports.xukmes = (() => {
  exports.xukmesskimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 5,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    LABEL: '',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
             }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
               PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload, g.lessreload, g.halfreload, g.halfreload, g.quadro_damage]),
                TYPE: exports.hypermissile,
            },  },
    ],
};
  exports.xukmesbody1 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 5,
    SKILL: setBuild("9999999999"),
    COLOR: "#AF9720",
    CONTROLLERS: ['slowspin'],
    TURRETS: (()=> {
      var tr = []
      for (let i = 0.5; i < 5; i++) {
        tr.push({
          POSITION: [8, 8, 0, (360 * i) / 5, 180, 0],
          TYPE: [exports.autoTurret, {PARENT: [exports.twin]}]
        })
      }
      return tr
    })()
  }
  exports.xukmesbody2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 7,
    SKILL: setBuild("9999999999"),
    COLOR: "#AF9720",
    CONTROLLERS: ['reverseslowspin'],
    TURRETS: (()=> {
      var tr = []
      for (let i = 0.5; i < 7; i++) {
        tr.push({
          POSITION: [8, 8, 0, (360 * i) / 7, 180, 0],
          TYPE: [exports.autoTurret, {PARENT: [exports.xukmesskimturret]}]
        })
      }
      return tr
    })()
  }
  return {
    PARENT: [exports.miniboss],
    LABEL: 'Celestial',
    NAME: 'Xukmes',
    COLOR: "#AF9720",
    SHAPE: 9,
    SIZE: 40,
    VALUE: 1000000,
    BODY: {
        HEALTH: base.HEALTH * 15 * 4,
        DAMAGE: base.DAMAGE * 4,
        SPEED: 1.3
    },
    TURRETS: [
        ...ctta,
        {
            POSITION: [15, 0, 0, 0, 360, 1],
            TYPE: exports.xukmesbody2
        },
        {
            POSITION: [9.5, 0, 0, 0, 360, 1],
            TYPE: exports.xukmesbody1
        }
    ]
  }
})()
exports.thedisease = (() => {
   exports.tdminion = {
     PARENT: [exports.minion],
     SHAPE: 4,
     MAX_CHILDREN: 8,
     FACING_TYPE: 'fastspin',
     BODY: {
      HEALTH: 5,
      DAMAGE: 7.5,
      FOV: 2.25
     },
     COLOR: "#cbc73cff",
     GUNS: (()=> {
       var gs = []
       exports.overlord.GUNS.forEach(e => {
         gs.push({
           POSITION: [
             e.POSITION[0],
             e.POSITION[1],
             e.POSITION[2],
             e.POSITION[3],
             e.POSITION[4],
             e.POSITION[5],
             e.POSITION[6],
           ],
           PROPERTIES: e.PROPERTIES
         })
       })
       return gs
     })()
   }
   exports.tdbody1 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 8,
    SKILL: setBuild("9999999999"),
    COLOR: "#cbc73cff",
    CONTROLLERS: ['slowspin'],
    GUNS: (()=> {
      var gs = []
      for (let i = 0.5; i < 4; i++) {
        gs.push({
          POSITION: [12, 4, 1.7, 0, 0, (360 * i) / 4, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.double_damage]),
            TYPE: exports.autosunchip,
            AUTOFIRE: true,
            MAX_CHILDREN: 7
          }
        })
      }
      return gs
    })()
  }
  exports.tdbody2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 8,
    SKILL: setBuild("9999999999"),
    COLOR: "#cbc73cff",
    CONTROLLERS: ['reversespin'],
    TURRETS: (()=> {
      var tr = []
      for (let i = 0; i < 4; i++) {
        tr.push({
          POSITION: [8, 8, 0, (360 * i) / 4, 90, 0],
          TYPE: [exports.autoTurret, {PARENT: [exports.twin]}]
        })
      }
      for (let i = 0.5; i < 4; i++) {
        tr.push({
          POSITION: [8, 8, 0, (360 * i) / 4, 90, 0],
          TYPE: [exports.autoTurret, {PARENT: [exports.ranger]}]
        })
      }
      return tr
    })()
  }
  return {
    PARENT: [exports.miniboss],
    LABEL: '???',
    NAME: 'The Disease',
    COLOR: "#cbc73cff",
    SHAPE: 12,
    SIZE: 40,
    VALUE: 1000000,
    BODY: {
        HEALTH: base.HEALTH * 15 * 4,
        DAMAGE: base.DAMAGE * 4,
        SPEED: 1.3
    },
    TURRETS: [
      {
        POSITION: [12.5, 0, 0, 0, 360, 1],
        TYPE: exports.tdbody2
      },
      {
        POSITION: [7.5, 0, 0, 0, 360, 1],
        TYPE: exports.tdbody1
      }
    ],
    GUNS: (()=> {
      var gs = []
      for (let i = 0; i < 8; i++) {
        gs.push({
           POSITION: [   5,     3,      1,      8.5,   0,      (360 * i) / 8,      0,   ], 
               }, {
           POSITION: [   2,     5,      1,      13.5,   0,      (360 * i) / 8,      0,   ], 
               PROPERTIES: {
                   SHOOT_SETTINGS: combineStats([g.factory]),
                   TYPE: exports.tdminion,
                   MAX_CHILDREN: 1
               }, }, {                        
           POSITION: [   4,     5,      1,      8,      0,      (360 * i) / 8,      0,   ], 
        })
      }
      return gs
    })()
  }
})()

exports.magturret1 = {
  PARENT: [exports.autoTurret],
  LABEL: '',
  GUNS: [
    {
      POSITION: [18, 4, 1, 9, 0, 0, 0.75],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
        TYPE: exports.bullet
      }
    }, {
      POSITION: [18, 4, 1, 9, 6.5, 0, 1],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
        TYPE: exports.bullet
      }
    }, {
      POSITION: [18, 4, 1, 9, -6.5, 0, 1.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
        TYPE: exports.bullet
      }
    }, {
      POSITION: [18, 4, 1, 0, 0, 0, 0.25],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
        TYPE: exports.bullet
      }
    }, {
      POSITION: [18, 4, 1, 0, 6.5, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
        TYPE: exports.bullet
      }
    }, {
      POSITION: [18, 4, 1, 0, -6.5, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
        TYPE: exports.bullet
      }
    }
  ]
}
exports.magbody1 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 5,
  COLOR: 11,
  SKILL: setBuild("9999999999"),
  CONTROLLERS: ['spin'],
  TURRETS: (()=> {
    let tr = []
    for (let i = 0.5; i < 5; i++) {
      tr.push({
        POSITION: [8, 8, 0, (360 * i) / 5, 180, 0],
        TYPE: exports.magturret1
      })
    }
    return tr
  })()
}
exports.magbody2 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 7,
  SKILL: setBuild("9999999999"),
  COLOR: 11,
  CONTROLLERS: ['reversespin'],
  TURRETS: [
    {
      POSITION: [8, 8, 0, (360 * 1.5) / 7, 180, 0],
      TYPE: [exports.autoTurret, {PARENT: [exports.artillery]}]
    },{
      POSITION: [8, 8, 0, (360 * 2.5) / 7, 180, 0],
      TYPE: [exports.autoTurret, {PARENT: [exports.artillery]}]
    },{
      POSITION: [8, 8, 0, (360 * 3.5) / 7, 180, 0],
      TYPE: [exports.autoTurret, {PARENT: [exports.artillery]}]
    },{
      POSITION: [8, 8, 0, (360 * 4.5) / 7, 180, 0],
      TYPE: [exports.autoTurret, {PARENT: [exports.artillery]}]
    },{
      POSITION: [8, 8, 0, (360 * 5.5) / 7, 180, 0],
      TYPE: [exports.autoTurret, {PARENT: [exports.artillery]}]
    },{
      POSITION: [8, 8, 0, (360 * 6.5) / 7, 180, 0],
      TYPE: [exports.autoTurret, {PARENT: [exports.artillery]}]
    },{
      POSITION: [8, 8, 0, (360 * 7.5) / 7, 180, 0],
      TYPE: [exports.autoTurret, {PARENT: [exports.artillery]}]
    }
  ]
}
exports.magmaporous = {
  PARENT: [exports.miniboss],
  LABEL: "Celestial",
  NAME: "Magmaporous",
  SHAPE: 9,
  COLOR: 11,
  VALUE: 1000000,
  SIZE: 40,
  SPEED: 0.1,
  BODY: {
    SPEED: base.SPEED * 0.06,
    HEALTH: base.HEALTH * 15 * 2,
    DAMAGE: base.DAMAGE * 5,
  },
  TURRETS: [
    ...ctta,
    {
      POSITION: [15, 0, 0, 0, 360, 1],
      TYPE: exports.magbody2
    }, {
      POSITION: [9.5, 0, 0, 0, 360, 1],
      TYPE: exports.magbody1
    }
  ]
}
exports.legion3 = {
  PARENT: [exports.elite],
  LABEL: "Elite Legion",
  SHAPE: 3,
  INDEPENDENT: true,
  BODY: {
    SPEED: base.SPEED * 0.6,
  },
  COLOR: 5,
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [5, 16, 1, 6, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
        TYPE: exports.bullet,
        LABEL: "Devastator",
      },
    },
    {
      POSITION: [5, 16, 1, 6, 0, 60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
        TYPE: exports.bullet,
        LABEL: "Devastator",
      },
    },
    {
      POSITION: [5, 16, 1, 6, 0, -60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
        TYPE: exports.bullet,
        LABEL: "Devastator",
      },
    },
  ],
  TURRETS: [
    {
      /*********  SIZE     X       Y     ANGLE    ARC */
      POSITION: [11, 0, 0, 180, 360, 0],
      TYPE: [exports.crasherSpawner],
    },
    {
      POSITION: [11, 0, 0, 60, 360, 0],
      TYPE: [exports.crasherSpawner],
    },
    {
      POSITION: [11, 0, 0, -60, 360, 0],
      TYPE: [exports.crasherSpawner],
    },
    {
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: [exports.bigauto4gun, { INDEPENDENT: true, COLOR: 5 }],
    },
  ],
};
exports.legion2 = {
  PARENT: [exports.elite],
  LABEL: "Elite Legion",
  SHAPE: 3,
  INDEPENDENT: true,
  BODY: {
    SPEED: base.SPEED * 0.6,
  },
  COLOR: 5,
  GUNS: [
    {
      POSITION: [6, 6, 0.6, 4.5, 0, -60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lowpower]),
        TYPE: exports.swarm,
      },
    },
    {
      POSITION: [6, 6, 0.6, 4.5, -8, -60, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lowpower]),
        TYPE: exports.swarm,
      },
    },
    {
      POSITION: [6, 6, 0.6, 4.5, 8, -60, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lowpower]),
        TYPE: exports.swarm,
      },
    },
    {
      POSITION: [6, 6, 0.6, 4.5, 0, 60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lowpower]),
        TYPE: exports.swarm,
      },
    },
    {
      POSITION: [6, 6, 0.6, 4.5, -8, 60, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lowpower]),
        TYPE: exports.swarm,
      },
    },
    {
      POSITION: [6, 6, 0.6, 4.5, 8, 60, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lowpower]),
        TYPE: exports.swarm,
      },
    },
    {
      POSITION: [6, 6, 0.6, 4.5, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lowpower]),
        TYPE: exports.swarm,
      },
    },
    {
      POSITION: [6, 6, 0.6, 4.5, -8, 180, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lowpower]),
        TYPE: exports.swarm,
      },
    },
    {
      POSITION: [6, 6, 0.6, 4.5, 8, 180, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lowpower]),
        TYPE: exports.swarm,
      },
    },
  ],
  TURRETS: [
    {
      POSITION: [5, 6.5, 0, 120, 180, 1],
      TYPE: [exports.autoTurret, { COLOR: 5 }],
    },
    {
      POSITION: [5, 6.5, 0, 240, 180, 1],
      TYPE: [exports.autoTurret, { COLOR: 5 }],
    },
    {
      POSITION: [5, 6.5, 0, 0, 180, 1],
      TYPE: [exports.autoTurret, { COLOR: 5 }],
    },
  ],
};
exports.legion1 = {
  PARENT: [exports.elite],
  LABEL: "Elite Legion",
  SHAPE: 3,
  INDEPENDENT: true,
  BODY: {
    SPEED: base.SPEED * 0.6,
  },
  COLOR: 5,
  TURRETS: [
    {
      POSITION: [13, 8, 0, 60, 180, 0],
      TYPE: exports.machine,
    },
    {
      POSITION: [13, 8, 0, -60, 180, 0],
      TYPE: exports.machine,
    },
    {
      POSITION: [13, 8, 0, 180, 180, 0],
      TYPE: exports.machine,
    },
  ],
};
exports.leg_crasherbod1 = {
  PARENT: [exports.genericTank],
  LABEL: "",
  SHAPE: 3,
  COLOR: 5,
  CONTROLLERS: ["reversespin"],
  GUNS: [
    {
      POSITION: [6, 10, 1, 0, 0, 0, 1.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.factory,
          g.lowpower,
          g.halfreload,
          g.halfreload,
        ]),
        TYPE: exports.legion1,
        MAX_CHILDREN: 1,
        AUTOFIRE: true,
      },
    },
    {
      POSITION: [6, 10, 1, 0, 0, 0, 1.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.factory,
          g.lowpower,
          g.halfreload,
          g.halfreload,
        ]),
        TYPE: exports.legion2,
        MAX_CHILDREN: 1,
        AUTOFIRE: true,
      },
    },
    {
      POSITION: [6, 10, 1, 0, 0, 0, 1.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.factory,
          g.lowpower,
          g.halfreload,
          g.halfreload,
        ]),
        TYPE: exports.legion3,
        MAX_CHILDREN: 1,
        AUTOFIRE: true,
      },
    },
    {
      POSITION: [6, 10, 0.6, 5, 5, 60, 0],
      /*PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lowpower]),
        TYPE: exports.swarm,
      },*/
    },
    {
      POSITION: [6, 10, 0.6, 5, -5, 60, 0],
      /*PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lowpower]),
        TYPE: exports.swarm,
      },*/
    },
    {
      POSITION: [6, 10, 0.6, 5, 5, -60, 0],
      /*PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lowpower]),
        TYPE: exports.swarm,
      },*/
    },
    {
      POSITION: [6, 10, 0.6, 5, -5, -60, 0],
      /*PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lowpower]),
        TYPE: exports.swarm,
      },*/
    },
    {
      POSITION: [6, 10, 0.6, 5, 5, 180, 0],
      /*PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lowpower]),
        TYPE: exports.swarm,
      },*/
    },
    {
      POSITION: [6, 10, 0.6, 5, -5, 180, 0],
      /*PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.lowpower]),
        TYPE: exports.swarm,
      },*/
    },
  ],
  TURRETS: [
    {
      POSITION: [12, 8, 0, 0, 180, 0],
      TYPE: exports.auto4gun,
    },
    {
      POSITION: [12, 8, 0, 120, 180, 0],
      TYPE: exports.auto4gun,
    },
    {
      POSITION: [12, 8, 0, 240, 180, 0],
      TYPE: exports.auto4gun,
    },
  ],
};
exports.elitespray = {
  PARENT: [exports.genericTank],
  LABEL: "Sprayer",
  COLOR: 5,
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [23, 7, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.gunner,
          g.lowpower,
          g.mach,
          g.morerecoil, g.pound, g.destroy, g.power, g.doublereload, g.mach
        ]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [12, 10, 1.4, 8, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound, g.destroy, g.power, g.doublereload, g.mach]),
        TYPE: exports.bullet,
      },
    },
  ],
};
exports.legion_crash = {
  PARENT: [exports.miniboss],
  LABEL: "Legionary Crasher",
  SHAPE: 3,
  SIZE: 90,
  COLOR: 5,
  VALUE: 4000000,
  BODY: {
    HEALTH: base.HEALTH * 15 * 5,
    DAMAGE: base.DAMAGE * 5,
    SPEED: base.SPEED * 0.06,
  },
  TURRETS: [
    {
      POSITION: [12, 0, 0, 0, 360, 1],
      TYPE: [exports.leg_crasherbod1, { COLOR: 5 }],
    },
    {
      POSITION: [14, 8, 0, 60, 180, 0],
      TYPE: [exports.elitespray, { COLOR: 5 }]
    },
    {
      POSITION: [14, 8, 0, -60, 180, 0],
      TYPE: [exports.elitespray, { COLOR: 5 }]
    },
    {
      POSITION: [14, 8, 0, 180, 180, 0],
      TYPE: [exports.elitespray, { COLOR: 5 }]
    },
  ],
  GUNS: [
    {
      POSITION: [14, 12.5, 1, 0, 0, 120, 0],
    },
    {
      POSITION: [4, 12.5, 1.5, 14, 0, 120, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
        TYPE: [exports.pillbox, { INDEPENDENT: true }],
      },
    },
    {
      POSITION: [14, 12.5, 1, 0, 0, 240, 0],
    },
    {
      POSITION: [4, 12.5, 1.5, 14, 0, 240, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
        TYPE: [exports.pillbox, { INDEPENDENT: true }],
      },
    },
    {
      POSITION: [14, 12.5, 1, 0, 0, 0, 0],
    },
    {
      POSITION: [4, 12.5, 1.5, 14, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
        TYPE: [exports.pillbox, { INDEPENDENT: true }],
      },
    },
    {
      POSITION: [7.6, 20, 0.6, 3, 0, 60, 0]
    },{
      POSITION: [7.6, 20, 0.6, 3, 0, -60, 0]
    },{
      POSITION: [7.6, 20, 0.6, 3, 0, 180, 0]
    }
  ],
};
exports.glitchton = (() => {
  exports.glitchtonturret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.sniper, g.power, g.morerecoil, g.turret]),
                TYPE: exports.bullet,
            }, },
      ],
  };
  // glitchton minion
  exports.gtm = {
    PARENT: [exports.elite],
    LABEL: 'Guard',
    CONTROLLERS: ['mapTargetToGoal', 'nearestDifferentMaster', 'canRepel', 'wander'],
    GUNS: (()=>{
      var gs = []
      for (let i = 0.5; i < 3; i++) {
        gs.push({
          POSITION: [13, 9, 1, 0, 0, (360 * i) / 3, 0]
        }, {
          POSITION: [2, 9, 1.3, 13, 0, (360 * i) / 3, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy, g.morereload]),
            TYPE: exports.trap
          }
        })
      }
      return gs
    })(),
    TURRETS: [
      {
        POSITION: [6, 7, 0, 120, 360, 1],
        TYPE: [exports.autoTurret, {PARENT: [exports.pound]}]
      },
      {
        POSITION: [6, 7, 0, 240, 360, 1],
        TYPE: [exports.autoTurret, {PARENT: [exports.pound]}]
      },
      {
        POSITION: [6, 7, 0, 0, 360, 1],
        TYPE: [exports.autoTurret, {PARENT: [exports.pound]}]
      }
    ]
  }
  exports.glitchtonbody = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 3,
    COLOR: 5,
    CONTROLLERS: ['slowspin'],
    GUNS: [{
      POSITION: [13, 9, 1, 0, 0, 60, 0]
    }, {
      POSITION: [3, 9, 1.3, 13, 0, 60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.pound]),
        TYPE: exports.trap
      }
    }, {
      POSITION: [13, 9, 1, 0, 0, -60, 0]
    }, {
      POSITION: [3, 9, 1.3, 13, 0, -60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.pound]),
        TYPE: exports.trap
      }
    }, {
      POSITION: [13, 9, 1, 0, 0, 180, 0]
    }, {
      POSITION: [3, 9, 1.3, 13, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.pound]),
        TYPE: exports.trap
      }
    }]
  }
  exports.glitchtonbody2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 3,
    COLOR: 5,
    CONTROLLERS: ['reverseslowspin'],
    GUNS: [{
      POSITION: [12, 17, 0.8, 0, 0, 60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, [1, 1, 1, 0.8, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
        TYPE: exports.gtm,
        AUTOFIRE: true,
        MAX_CHILDREN: 1
      }
    }, {
      POSITION: [12, 17, 0.8, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, [1, 1, 1, 0.8, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
        TYPE: exports.gtm,
        AUTOFIRE: true,
        MAX_CHILDREN: 1
      }
    }, {
      POSITION: [12, 17, 0.8, 0, 0, -60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, [1, 1, 1, 0.8, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
        TYPE: exports.gtm,
        AUTOFIRE: true,
        MAX_CHILDREN: 1
      }
    }]
  },
  exports.glitchtonshell = {
    SHAPE: 3,
    COLOR: 19
  }
  return {
    PARENT: [exports.elite],
    LABEL: '???',
    NAME: 'Glitchton',
    VALUE: 4500000,
    SIZE: 100,
    CONTROLLERS: ['goton'],
    TYPE: 'miniboss',
    BODY: {
      HEALTH: base.HEALTH * 15 * 8,
      SHIELD: base.HEALTH * 15 * 2,
      DAMAGE: base.DAMAGE * 3
    },
    TURRETS: [
      {
        POSITION: [22.5, 0, 0, 0, 0, 0],
        TYPE: exports.glitchtonshell
      },
      {
        POSITION: [16, 0, 0, 0, 360, 1],
        TYPE: [exports.glitchtonshell, {CONTROLLERS: ['reverseslowspin']}]
      },
      {
        POSITION: [15, 0, 0, 0, 360, 1],
        TYPE: exports.glitchtonbody2
      },
      {
        POSITION: [10.5, 0, 0, 0, 360, 1],
        TYPE: [exports.glitchtonshell, {CONTROLLERS: ['slowspin']}]
      },
      {
        POSITION: [7.5, 0, 0, 0, 360, 1],
        TYPE: exports.glitchtonbody
      },
      {
        POSITION: [7, 0, 0, 0, 360, 1],
        TYPE: exports.glitchtonturret
      }
    ],
    GUNS: [
      {
        POSITION: [13, 9, 1, 0, 0, (360 * 1.5) / 3, 0]
      }, {
        POSITION: [2, 9, 1.3, 13, 0, (360 * 1.5) / 3, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy, g.morereload]),
          TYPE: exports.trap
        }
      },
      {
        POSITION: [13, 9, 1, 0, 0, (360 * 2.5) / 3, 0]
      }, {
        POSITION: [2, 9, 1.3, 13, 0, (360 * 2.5) / 3, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy, g.morereload]),
          TYPE: exports.trap
        }
      },
      {
        POSITION: [13, 9, 1, 0, 0, (360 * 3.5) / 3, 0]
      }, {
        POSITION: [2, 9, 1.3, 13, 0, (360 * 3.5) / 3, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy, g.morereload]),
          TYPE: exports.trap
        }
      }
    ]
  }
})()
// semi celestials
exports.autoSpray = {
  PARENT: [exports.autoTurret],
  LABEL: "Auto Spray",
  BODY: {
    FOV: 2,
  },
  GUNS: [
    {
      POSITION: [18, 10, 1.5, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner]),
        TYPE: exports.bullet,
      },
    },
  ],
};
exports.bosslay1 = {
  PARENT: [exports.genericTank],
  LABEL: "Boss layer 1",
  CONTROLLERS: ["reverseslowspin"],
  SHAPE: 4,
  COLOR: 6,
  SKILL: setBuild("9999999999"),
  TURRETS: [
    {
      POSITION: [8, 8, 0, 90, 180, 0],
      TYPE: exports.autoSpray,
    },
    {
      POSITION: [8, 8, 0, 180, 180, 0],
      TYPE: exports.autoSpray,
    },
    {
      POSITION: [8, 8, 0, 270, 180, 0],
      TYPE: exports.autoSpray,
    },
    {
      POSITION: [8, 8, 0, 0, 180, 0],
      TYPE: exports.autoSpray,
    },
  ],
};
exports.bossCele = {
  PARENT: [exports.miniboss],
  LABEL: "Semi-Celestial",
  NAME: 'Zamolxis',
  FACING_TYPE: "autospin",
  SIZE: 35,
  VALUE: 750000,
  BODY: {
    HEALH: base.HEALTH * 15 * 2,
    DAMAGE: base.DAMAGE * 2 * 3,
    SPEED: base.SPEED * 0.12,
  },
  SHAPE: 6,
  SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  COLOR: 6,
  TURRETS: [
    {
      POSITION: [10, 0, 0, 0, 360, 1],
      TYPE: exports.bosslay1,
    },
    {
      POSITION: [8, 8, 0, (360 * 1) / 6, 90, 0],
      TYPE: exports.autoSpray,
    },
    {
      POSITION: [8, 8, 0, (360 * 2) / 6, 90, 0],
      TYPE: exports.autoSpray,
    },
    {
      POSITION: [8, 8, 0, (360 * 3) / 6, 90, 0],
      TYPE: exports.autoSpray,
    },
    {
      POSITION: [8, 8, 0, (360 * 4) / 6, 90, 0],
      TYPE: exports.autoSpray,
    },
    {
      POSITION: [8, 8, 0, (360 * 5) / 6, 90, 0],
      TYPE: exports.autoSpray,
    },
    {
      POSITION: [8, 8, 0, (360 * 6) / 6, 90, 0],
      TYPE: exports.autoSpray,
    },
  ],
};
exports.derzelas = (() => {
  exports.dzlayer = {
    PARENT: [exports.genericTank],
    LABEL: "",
    SHAPE: 4,
    COLOR: 37,
    CONTROLLERS: ['reverseslowspin'],
    SKILL: setBuild("9999999999"),
    TURRETS: (()=> {
      var tr = []
      for (let i = 0; i < 2; i++) {
        tr.push({
          POSITION: [10, 8, 0, (360 * i) / 2, 180, 0],
          TYPE: [exports.autoTurret, {PARENT: [exports.cruiser]}]
        })
      }
      for (let i = 0.5; i < 2; i++) {
        tr.push({
          POSITION: [10, 8, 0, (360 * i) / 2, 180, 0],
          TYPE: [exports.autoTurret, {PARENT: [exports.carrier]}]
        })
      }
      return tr
    })()
  }
  return {
    PARENT: [exports.miniboss],
    LABEL: 'Semi-Celestial',
    NAME: 'Derzelas',
    SIZE: 35,
    BODY: {
      HEALTH: base.HEALTH * 15 * 2,
      DAMAGE: base.DAMAGE * 2 * 3,
      SPEED: base.SPEED * 0.12
    },
    SHAPE: 6,
    COLOR: 37,
    VALUE: 750000,
    TURRETS: (()=>{
      var tr = []
      tr.push({
        POSITION: [10, 0, 0, 0, 360, 1],
        TYPE: exports.dzlayer
      })
      for (let i = 0; i < 6; i++) {
        tr.push({
          POSITION: [8, 8, 0, (360 * i) / 6, 90, 0],
          TYPE: exports.autoSpray
        })
      }
      return tr
    })()
  }
})()
exports.sabazios = (() => {
  exports.szlayer = {
    PARENT: [exports.genericTank],
    LABEL: "",
    SHAPE: 4,
    COLOR: 38,
    CONTROLLERS: ['reverseslowspin'],
    SKILL: setBuild("9999999999"),
    TURRETS: (()=> {
      var tr = []
      for (let i = 0; i < 4; i++) {
        tr.push({
          POSITION: [10, 8, 0, (360 * i) / 4, 180, 0],
          TYPE: [exports.autoTurret, {PARENT: [exports.sidewind]}]
        })
      }
      return tr
    })()
  }
  return {
    PARENT: [exports.miniboss],
    LABEL: 'Semi-Celestial',
    NAME: 'Sabazios',
    SIZE: 35,
    BODY: {
      HEALTH: base.HEALTH * 15 * 2,
      DAMAGE: base.DAMAGE * 2 * 3,
      SPEED: base.SPEED * 0.12
    },
    SHAPE: 6,
    COLOR: 38,
    VALUE: 750000,
    TURRETS: (()=>{
      var tr = []
      tr.push({
        POSITION: [10, 0, 0, 0, 360, 1],
        TYPE: exports.szlayer
      })
      for (let i = 0; i < 6; i++) {
        tr.push({
          POSITION: [8, 8, 0, (360 * i) / 6, 90, 0],
          TYPE: exports.autoSpray
        })
      }
      return tr
    })()
  }
})()
exports.pleistoros  = (() => {
  exports.pllayer = {
    PARENT: [exports.genericTank],
    LABEL: "",
    SHAPE: 4,
    COLOR: 39,
    CONTROLLERS: ['reverseslowspin'],
    SKILL: setBuild("9999990999"),
    TURRETS: (()=> {
      var tr = []
      for (let i = 0; i < 4; i++) {
        tr.push({
          POSITION: [10, 8, 0, (360 * i) / 4, 180, 0],
          TYPE: [exports.autoTurret, {PARENT: [exports.skimmer]}]
        })
      }
      return tr
    })()
  }
  return {
    PARENT: [exports.miniboss],
    LABEL: 'Semi-Celestial',
    NAME: 'Pleistoros',
    SIZE: 35,
    BODY: {
      HEALTH: base.HEALTH * 15 * 2,
      DAMAGE: base.DAMAGE * 2 * 3,
      SPEED: base.SPEED * 0.12
    },
    SHAPE: 6,
    COLOR: 39,
    VALUE: 750000,
    TURRETS: (()=>{
      var tr = []
      tr.push({
        POSITION: [10, 0, 0, 0, 360, 1],
        TYPE: exports.pllayer
      })
      for (let i = 0; i < 6; i++) {
        tr.push({
          POSITION: [8, 8, 0, (360 * i) / 6, 90, 0],
          TYPE: exports.autoSpray
        })
      }
      return tr
    })()
  }
})()
exports.trimurti = (() => {
  exports.tmturret_bl = {
    PARENT: [exports.autoTurret],
    GUNS: [
      {
        POSITION: [23, 12, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.power, g.power, g.pound]),
          TYPE: exports.bullet
        }
      }
    ]
  }
  exports.tmbullet = {
    PARENT: [exports.bullet],
    HAS_NO_RECOIL: true,
    TURRETS: [
      {
        POSITION: [10, 0, 0, 0, 360, 1],
        TYPE: exports.tmturret_bl
      }
    ]
  }
  exports.tmturret = {
    PARENT: [exports.autoTurret],
    GUNS: [
      {
        POSITION: [21, 10, 2, 0, 0, 0, 0]
      }, {
        POSITION: [17.5, 20, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.double_damage, g.quadro_damage, g.quadro_damage, g.power]),
          TYPE: exports.tmbullet
        }
      }
    ]
  }
  exports.tmlayer = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 4,
    COLOR: 41,
    CONTROLLERS: ['reverseslowspin'],
    TURRETS: (()=> {
      var tr = []
      for (let i = 0; i < 4; i++) {
        tr.push({
          POSITION: [8, 8, 0, (360 * i) / 4, 110, 0],
          TYPE: exports.tmturret
        })
      }
      return tr
    })()
  }
  return {
    PARENT: [exports.miniboss],
    LABEL: 'Semi-Celestial',
    NAME: 'Trimurti',
    SIZE: 35,
    BODY: {
      HEALTH: base.HEALTH * 15 * 2,
      DAMAGE: base.DAMAGE * 2 * 3,
      SPEED: base.SPEED * 0.12
    },
    SHAPE: 6,
    COLOR: 41,
    VALUE: 750000,
    TURRETS: (()=>{
      var tr = []
      tr.push({
        POSITION: [10, 0, 0, 0, 360, 1],
        TYPE: exports.tmlayer
      })
      for (let i = 0; i < 6; i++) {
        tr.push({
          POSITION: [8, 8, 0, (360 * i) / 6, 90, 0],
          TYPE: exports.autoSpray
        })
      }
      return tr
    })()
  }
})()
exports.abyssling = {
  PARENT: [exports.miniboss],
  LABEL: 'Abyssling',
  FACING_TYPE: 'locksFacing',
  SHAPE: 6,
  SIZE: 105.10100501 / 3, // According to the Wiki and 3x smaller
  BODY: {
    SPEED: 5, // According to the Wiki (again)
    HEALTH: 10000,
    DAMAGE: 1.5
  },
  VALUE: 250000,
  COLOR: 36,
  HAS_NO_RECOIL: true,
  GUNS: [
    // trap gun base
    {
      POSITION: [11, 4, 1, 0, 0, (360 * 1) / 6, 0]
    },{
      POSITION: [11, 4, 1, 0, 0, (360 * 2) / 6, 0]
    },{
      POSITION: [11, 4, 1, 0, 0, (360 * 3) / 6, 0]
    },{
      POSITION: [11, 4, 1, 0, 0, (360 * 4) / 6, 0]
    },{
      POSITION: [11, 4, 1, 0, 0, (360 * 5) / 6, 0]
    },
    // shooting guns
    {
      POSITION: [18, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pound, g.destroy, g.doublereload]),
        TYPE: exports.bullet
      }
    },{
      POSITION: [3, 4, 1.7, 11, 0, (360 * 1) / 6, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy, g.slow, g.slow]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4, 1.7, 11, 0, (360 * 2) / 6, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy, g.slow, g.slow]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4, 1.7, 11, 0, (360 * 3) / 6, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy, g.slow, g.slow]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4, 1.7, 11, 0, (360 * 4) / 6, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy, g.slow, g.slow]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4, 1.7, 11, 0, (360 * 5) / 6, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy, g.slow, g.slow]),
        TYPE: exports.trap
      }
    },
  ],
  TURRETS: [
    {
      POSITION: [22.5, 0, 0, 0, 0, 0],
      TYPE: [exports.shellabyss = {
        SHAPE: 6,
        COLOR: 17
      }]
    }, {
      POSITION: [12.5, 0, 0, 0, 0, 1],
      TYPE: exports.shellabyss
    }, {
      POSITION: [11, 0, 0, 0, 0, 1],
      TYPE: [exports.bodyabyss = {
        SHAPE: 6,
        COLOR: 36 
      }]
    }, {
      POSITION: [8, 0, 0, 0, 360, 1],
      TYPE: exports.autoTurret
    }
  ]
}
exports.buggedabyssling = {
  PARENT: [exports.miniboss],
  LABEL: 'Bugged Abyssling',
  FACING_TYPE: 'locksFacing',
  SHAPE: 6,
  SIZE: 105.10100501 / 3, // According to the Wiki and 3x smaller
  BODY: {
    SPEED: 512, // According to the Wiki (again)
    HEALTH: 10000,
    DAMAGE: 3,
  },
  VALUE: 250000,
  COLOR: 36,
  HAS_NO_RECOIL: true,
  GUNS: [
    // trap gun base
    {
      POSITION: [11, 4, 1, 0, 0, (360 * 1) / 6, 0]
    },{
      POSITION: [11, 4, 1, 0, 0, (360 * 2) / 6, 0]
    },{
      POSITION: [11, 4, 1, 0, 0, (360 * 3) / 6, 0]
    },{
      POSITION: [11, 4, 1, 0, 0, (360 * 4) / 6, 0]
    },{
      POSITION: [11, 4, 1, 0, 0, (360 * 5) / 6, 0]
    },
    // shooting guns
    {
      POSITION: [18, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pound, g.destroy, g.doublereload]),
        TYPE: exports.bullet
      }
    },{
      POSITION: [3, 4, 1.7, 11, 0, (360 * 1) / 6, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy, g.slow, g.slow]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4, 1.7, 11, 0, (360 * 2) / 6, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy, g.slow, g.slow]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4, 1.7, 11, 0, (360 * 3) / 6, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy, g.slow, g.slow]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4, 1.7, 11, 0, (360 * 4) / 6, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy, g.slow, g.slow]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4, 1.7, 11, 0, (360 * 5) / 6, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy, g.slow, g.slow]),
        TYPE: exports.trap
      }
    },
  ],
  TURRETS: [
    {
      POSITION: [22.5, 0, 0, 0, 0, 0],
      TYPE: [exports.shellabyss]
    }, {
      POSITION: [12.5, 0, 0, 0, 0, 1],
      TYPE: exports.shellabyss
    }, {
      POSITION: [11, 0, 0, 0, 0, 1],
      TYPE: [exports.bodyabyss]
    }, {
      POSITION: [8, 0, 0, 0, 360, 1],
      TYPE: exports.autoTurret
    }
  ]
}
// clustergons
exports.squarecluster = {
  PARENT: [exports.food],
  FOOD: {
        LEVEL: 1
    },
    LABEL: "Square Cluster",
    VALUE: 20 * 30,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 13,
    SPLIT: 'sqclus',
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2
    },
  TURRETS: (()=>{
    var tr = []
    for (let i = 0; i < 4; i++) {
      tr.push({
        POSITION: [20, 30, 0, (360 * i) / 4, 360, 1],
        TYPE: [exports.square, {CONTROLLERS: ['slowspin']}]
      },{
        POSITION: [20, 60, 0, (360 * i) / 6, 360, 1],
        TYPE: [exports.square, {CONTROLLERS: ['slowspin']}]
      },{
        POSITION: [20, 90, 0, (360 * i) / 5, 360, 1],
        TYPE: [exports.square, {CONTROLLERS: ['slowspin']}]
      })
    }
    return tr
  })(),
    DRAW_HEALTH: true,
    INTANGIBLE: false
}

// Pecoka's Bosses To Recreate

/* Anarcy (Idea by @!Attakante) */

/* Acrocity (Idea by @2014) */


/* Egger (Idea by @2014) */
exports.eggerdrone = {
  PARENT: [exports.sunchip],
  SHAPE: 0,
  INDEPENDENT: true
}
 exports.eggspawner = {
                PARENT: [exports.genericTank],
                LABEL: '',
                DANGER: 7,
                SKILL: setBuild("9999999999"),
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                MAX_CHILDREN: 18,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.doublereload, g.doublereload]),
                            TYPE: exports.eggerdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.doublereload, g.doublereload]),
                            TYPE: exports.eggerdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.doublereload, g.doublereload]),
                            TYPE: exports.eggerdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.doublereload, g.doublereload]),
                            TYPE: exports.eggerdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
            };
exports.egger = {
  PARENT: [exports.miniboss],
  LABEL: 'Egger',
  COLOR: 6,
  SIZE: 30,
  BODY: {
    HEALTH: 4500,
    DAMAGE: 4,
    SPEED: 1.2
  },
  GUNS: [
    {
      POSITION: [15, 8, 1, 0, 0, 90, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [15, 8, 1, 0, 0, -90, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
        TYPE: exports.bullet
      }
    },
  ],
  TURRETS: [
    {
      POSITION: [8, 0, 0, 0, 0, 1],
      TYPE: exports.eggspawner
    }
  ]
}
exports.mounted = {
  PARENT: [exports.autoTurret],
  LABEL: 'Mounted',
  SHAPE: 4,
  GUNS: [
    {
      POSITION: [2, 16, 1.2, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone]),
        TYPE: exports.drone,
        AUTOFIRE: true
      }
    }
  ],
  MAX_CHILDREN: 5
}
exports.abyssguardian = {
  PARENT: [exports.miniboss],
  LABEL: 'Abyss Guardian',
  COLOR: 36,
  SHAPE: 9,
  HAS_NO_RECOIL: true,
  SIZE: 25,
  FACING_TYPE: 'locksFacing',
  VALUE: 4120000,
  BODY: {
    HEALTH: 2000000,
    DAMAGE: 600,
    SPEED: 26,
    PUSHABILITY: 0
  },
  TURRETS: [
    {
      POSITION: [23, 0, 0, 0, 0, 0],
      TYPE: [exports.abyssguardianshell = {
        SHAPE: 9,
        COLOR: 17
      }]
    },
    {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.abyssguardianshell]
    },{
      POSITION: [12, 0, 0, 0, 0, 1],
      TYPE: [exports.abyssguardianbody = {
        SHAPE: 9,
        COLOR: 36
      }]
    },
    {
      POSITION: [8, 0, 0, 0, 0, 1],
      TYPE: [exports.abyssguardianshell]
    },{
      POSITION: [5, 0, 0, 0, 0, 1],
      TYPE: [exports.abyssguardianbody]
    },
    {
      POSITION: [1.5, 9, 0, 0, 360, 1],
      TYPE: [exports.autoTurret]
    },{
      POSITION: [1.5, -9, 0, 0, 360, 1],
      TYPE: [exports.autoTurret]
    },{
      POSITION: [1.5, 0, 9, 0, 360, 1],
      TYPE: [exports.autoTurret]
    },{
      POSITION: [1.5, 0, -9, 0, 360, 1],
      TYPE: [exports.autoTurret]
    },
    {
      POSITION: [1.5, 9, 0, 45, 0, 1],
      TYPE: [exports.mounted]
    },{
      POSITION: [1.5, -9, 0, 45, 0, 1],
      TYPE: [exports.mounted]
    },{
      POSITION: [1.5, 0, 9, 45, 0, 1],
      TYPE: [exports.mounted]
    },{
      POSITION: [1.5, 0, -9, 45, 0, 1],
      TYPE: [exports.mounted]
    },
    {
      POSITION: [1.5, 5, 0, 0, 0, 1],
      TYPE: [exports.mounted]
    },{
      POSITION: [1.5, -5, 0, 0, 0, 1],
      TYPE: [exports.mounted]
    },{
      POSITION: [1.5, 0, 5, 0, 0, 1],
      TYPE: [exports.mounted]
    },{
      POSITION: [1.5, 0, -5, 0, 0, 1],
      TYPE: [exports.mounted]
    },
    {
      POSITION: [3, 0, 0, 0, 360, 1],
      TYPE: [exports.abyssguardianturret = {
        PARENT: [exports.autoTurret],
        GUNS: [
          {
            POSITION: [56, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
              TYPE: exports.bullet
            }
          }
        ]
      }]
    },
  ],
  GUNS: [
    {
      POSITION: [18, 4.5, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.morereload, g.power]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [14, 4.5, 1, 0, 0, (360 * 1) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 2) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 3) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 4) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 5) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 6) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 7) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 8) / 9, 0]
    },{
      POSITION: [3, 4.5, 1.4, 12, 0, (360 * 1) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4.5, 1.4, 12, 0, (360 * 2) / 9, 10],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4.5, 1.6, 12, 0, (360 * 3) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4.5, 1.6, 12, 0, (360 * 4) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4.5, 1.6, 12, 0, (360 * 5) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4.5, 1.6, 12, 0, (360 * 6) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4.5, 1.4, 12, 0, (360 * 7) / 9, 10],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4.5, 1.6, 12, 0, (360 * 8) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },
  ]
}
exports.buggedabyssguardian = {
  PARENT: [exports.miniboss],
  LABEL: 'Bugged Abyss Guardian',
  COLOR: 36,
  SHAPE: 9,
  HAS_NO_RECOIL: true,                                
  SIZE: 25,
  FACING_TYPE: 'locksFacing',
  VALUE: 4120000,
  BODY: {
    HEALTH: 2000000,
    DAMAGE: 600,
    SPEED: 256,              
    PUSHABILITY: 0
  },
  TURRETS: [
    {
      POSITION: [23, 0, 0, 0, 0, 0],
      TYPE: [exports.abyssguardianshell]
    },
    {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.abyssguardianshell]
    },{
      POSITION: [12, 0, 0, 0, 0, 1],
      TYPE: [exports.abyssguardianbody]
    },
    {
      POSITION: [8, 0, 0, 0, 0, 1],
      TYPE: [exports.abyssguardianshell]
    },{
      POSITION: [5, 0, 0, 0, 0, 1],
      TYPE: [exports.abyssguardianbody]
    },
    {
      POSITION: [1.5, 9, 0, 0, 360, 1],
      TYPE: [exports.autoTurret]
    },{
      POSITION: [1.5, -9, 0, 0, 360, 1],
      TYPE: [exports.autoTurret]
    },{
      POSITION: [1.5, 0, 9, 0, 360, 1],
      TYPE: [exports.autoTurret]
    },{
      POSITION: [1.5, 0, -9, 0, 360, 1],
      TYPE: [exports.autoTurret]
    },
    {
      POSITION: [1.5, 9, 0, 45, 0, 1],
      TYPE: [exports.mounted]
    },{
      POSITION: [1.5, -9, 0, 45, 0, 1],
      TYPE: [exports.mounted]
    },{
      POSITION: [1.5, 0, 9, 45, 0, 1],
      TYPE: [exports.mounted]
    },{
      POSITION: [1.5, 0, -9, 45, 0, 1],
      TYPE: [exports.mounted]
    },
    {
      POSITION: [1.5, 5, 0, 0, 0, 1],
      TYPE: [exports.mounted]
    },{
      POSITION: [1.5, -5, 0, 0, 0, 1],
      TYPE: [exports.mounted]
    },{
      POSITION: [1.5, 0, 5, 0, 0, 1],
      TYPE: [exports.mounted]
    },{
      POSITION: [1.5, 0, -5, 0, 0, 1],
      TYPE: [exports.mounted]
    },
    {
      POSITION: [3, 0, 0, 0, 360, 1],
      TYPE: [exports.abyssguardianturret = {
        PARENT: [exports.autoTurret],
        GUNS: [
          {
            POSITION: [56, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.sniper]),
              TYPE: exports.bullet
            }
          }
        ]
      }]
    },
  ],
  GUNS: [
    {
      POSITION: [18, 4.5, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.morereload, g.power]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [14, 4.5, 1, 0, 0, (360 * 1) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 2) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 3) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 4) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 5) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 6) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 7) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 8) / 9, 0]
    },{
      POSITION: [3, 4.5, 1.4, 12, 0, (360 * 1) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4.5, 1.4, 12, 0, (360 * 2) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4.5, 1.6, 12, 0, (360 * 3) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4.5, 1.6, 12, 0, (360 * 4) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4.5, 1.6, 12, 0, (360 * 5) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4.5, 1.6, 12, 0, (360 * 6) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4.5, 1.4, 12, 0, (360 * 7) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4.5, 1.6, 12, 0, (360 * 8) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },
  ]
};
// Polybosses
// exports.squarepolyboss = {
//   PARENT: [exports.genericTank],
//   LABEL: 'Square Polyboss',
//   SHAPE: 4,
//   COLOR: 13,
//   // GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
//   //   POSITION: [],
//   // }]
// };
// Pecoka Bosses

// Testbed Tanks
exports.cursedtank = {
            PARENT: [exports.genericTank],
            LABEL: 'Cursed Tank',
            GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [18, 90, 0.5, 0, 0, 0, 0],
              PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.bullet, g.pound, g.double_damage]),
              TYPE: exports.bullet
              }, },
            ],
  };
exports.bigbean = {
 PARENT: [exports.genericTank],
            LABEL: 'Big Bean',
            GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [18, 10, 0.5, 0, 0, 0, 0],
              PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.bullet, g.pound, g.double_damage]),
              TYPE: exports.bullet
              }, },
            ],
  };
exports.m = {
            PARENT: [exports.genericTank],
            SHAPE: [[-0.82,-0.77],[1.02,-0.03],[-0.93,0.64],[0.987,0.95],[-0.03,1.007],[-1.04,0.98],[-0.98,-1],[1.026,-0.99]],
            LABEL: 'M',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        }, }, 
    ],
  };
exports.arrasmayhem = {
 PARENT: [exports.genericTank],
            LABEL: 'ArrasMayhem be like',
  BODY: {
    HEALTH: 1E9999
  },
            GUNS: [{ /*** LENGTH WIDTH ASPECT X Y ANGLE DELAY*/
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.arrasmayhem]),
            TYPE: exports.bullet,
            }
        }
    ]
};
exports.arrasmayhem2 = {
 PARENT: [exports.genericTank],
            LABEL: 'Me on the way to do your Mom',
  BODY: {
    HEALTH: 1E9999
  },
            GUNS: [{ /*** LENGTH WIDTH ASPECT X Y ANGLE DELAY*/
            POSITION: [  18,     20,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.arrasmayhem, g.pound, g.destroy, g.anni]),
            TYPE: exports.bullet,
            }
        }
    ]
};
exports.arrasmayhem3 = {
 PARENT: [exports.genericTank],
            LABEL: 'C̵̡̧̧̧̳͚̗̦̟̯̻͈̭̤͉͍̟͉̬̯̰̞̖̤̖͖̙̰̹̯̺̭̯̯̟̱̮̪̺̞̼̹͎͖̫͎͂̓̋̾͂̒̈́̓̈͌̉̽͗̈́̆͋̑̀̑͗̒̇̂̈́̓̈́̋́̌́͆̅͌̓͛̒̕̕̕͘͝͝͝͠͝ ̸̡̢̡̢̛̛̝̳̫̻̜̱̹͙̩͕͓̙͙͙̯̥̜̖̭͇̤̼̦͍̟̰̃̍̒͛̈̀͆̎̇̍̔̔̐̆͌̽̂̐̓̊̓̃̒̍̍̉̕̕͠͝͝͝͠Ơ̶̡̢̪̦̺̫̹̝͎̹̼͓̪̹̩̮͌͒̂̈̀̓͗̽͛̑̓́̆́͗̔̾́̊̾͐̍͊͂̐͋́̇̄͘͘͜͝͝ ̷̢̙͕̰̱̪̱͔̩͈̏̓̃̽̈́̑́͜ͅŅ̷̨͙̝͉̫͓͕̫̺̬̺̘̯̹̜̣̭̘̪͕͒̔̃́̾̾͐̈́̋̆̽̌̿̌͆͐̌̔̈̈́̐͜͜ͅ ̶̡̢̡̢̱͍̝̙͚̦͇̯̼̞͍̤̮͔̱̰̼̘̱̮̘͇̫̺̗̬̱̫̯͍̯̻̹̻̅͊̐̄̓̀̿̋́̾̅̉̈́̈́̏̀̆̈́͌́͌̓͋͒̅̇̔͊͋͋͑̍̈́̓̿̂͐̄͊̓͐͆͊̃͘͝͝ͅS̸̢̨̤͖̯͚̫̱̻̞̫̘͎̳̳̰͔͍̟͔͎̟̻̭̳̭̗̩̱͙̳̮̳͚̼͎̾̀̌́̌͊̎̅͐͑͊̍͋̎̓̈̐̍͑̓̀̊̃̈́̄̓̀͋͊͘͜͜͠͝͝ ̶̨͈͖̣̰̟͉̥̬͕͚͑͆͌̍̽͌̅̌̄̎̿̇͗̈̔̀̀͐͊̾̍̇̀̑̓̉̅̐͊͒͘͘͜͝͝͝͝ͅT̶̢̨̨̨̨̡̘̪̲̻̻̫̟͓̻̦̫͍͎̫̩̰͇̮̝̦͚̗̞̮̦̲̳̼̣̗̺͎̪̳͒̏̎͒́͑̏̿̕̕̚͜͝ͅ ̵̡̛͔̫̬͓̫̥̭̤̰̬͍̗̗̯͚͕̻̺̹̱̯͙͙̺̹̅̎̍͒̐̈̾̍̀̀̀͒̍̉̉̈́̑̒̅͆́͑͊̏͑̉̿́̕̚̕͜͝͠R̴̨̠̞̗͖̱̘̼̠̻̼̠̖̩͇̥̱̘͇̖̤̍̄̒͌͆̌̓̓̏́͐́̋̎̑̉̆͒̾̀̽̇͛͑́̓̒͋̍͑́̈́̌̕͘̕̕̕͠͠͝ͅ ̴̡̧̢̗̺̯̜͍̬̹͓̯̘͎̲͍̬̻̬͙͇̠̞̬̗̳̟̲̫̻͇͆́̋̿̔̽̌͛͊̔͛̓̀̈́̓̈́̎̀͊͒͌̽̂̉͐̋̈̐́͘̚͜Ū̷̻͆ ̵̡̧̧̨͖̺͈͍̣̹͖̯̻̰͍̤̦̲͊̎͂̊̄͑̒̑͐̇͆́͆̏̅̇͝C̸̢̨̡̨͔̰͍̦͕̮̱̺̩̮̪̙͍̥̻̗̼͚͔͉̹͙̗̬̙͈̗̦͎̟͓̫͌̾̓̀̈́̍̀͒̉͒̆̽́̓̇̐̚͝ͅͅͅ ̷̢̛̹̘̭̗̖͖͖̻͇̭̪̦͙̬̟̮̲̙̓͑͗͝T̷̡̧̢̡̛̛̲̘̠̩̯̦̼̙̙̳̼͓̯̩̭͍̰̻̯̭͍͕̘̺̗̳̻̝̗̘̥̦͚͎͙͇͇͍̼̘̩̲̥̟͂̀̆͆̄̏͊̽̒̓̍̿͗̔̂̀̑̍͆́̄̅̂̿̈́̏̊͆̾̉̉͂̎̚̚̚͝͝͠ͅ ̴̡̡̨̛̝̫̜͉͖̺̟̦͓̹͉̪͍̟̪̼̪̱͍̳̙͓̙̮̲̠̱̞̊̉͐̆͑͑̀͗͛̋͜͠͝Ǫ̴̧̘̮͕̝̪͕̪̹͉̤͎̥̥̭̝̰͔̦̉̇̑̓̆̂̀̇̽͛̈͌͂̾́͘͝ ̶̧̢̧̝̳̱̼̳͔͈̺͉̱̳̞̗̳̲͕̝͕͓̭͚̞̠̹͎͖̯̩̖̱̼̙̺̬̈́̐̐͋̍͂̒̚͜͜͜͝ͅR̷̨̨͚̘̫͓̯̹̰͉̮̘̥͇̯̺͔̗̯̬͎̹̮̩͙̜͍̼̘̖̲̰͖̬̲͔̃̄̈́̐̐̉̈́̈́̈͑̍̌̎̄̾̀͆̓̚̕͝͠͝͠ͅͅͅ',
  BODY: {
    HEALTH: 1E9999
  },
            GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    18,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    18,     1.2,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.arrasmayhem, g.block, g.construct]),
                            TYPE: exports.block,
                        }, }, 
    ]
};
exports.spectator ={
 PARENT: [exports.genericTank],
 SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            LABEL: 'Spectator',
            DANGER: 0,
            BODY: {
    HEALTH: 10000000000,
    DAMAGE: 0,
    SPEED: 25,              
    PUSHABILITY: 0,
    FOV: 8},
            TURRETS: [],
            GUNS: [],
            INVISIBLE: [true],
};

exports.rider = {
    PARENT: [exports.genericTank],
    LABEL: 'Rider',
  //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.pounder]), //doesn't shoots
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.celestialTrapTurret = {
  PARENT: [exports.autoTurret],
  LABEL: "celestial Trap Turret",
  SIZE: 12,
  SHAPE: 0,
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [16, 14, 1, 0, 0, 0, 0],
    },
    {
      POSITION: [4, 14, 1.8, 16, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.trap,
          g.halfreload,
          g.halfreload,
          g.halfreload,
        ]),
        TYPE: exports.trap,
        STAT_CALCULATOR: gunCalcNames.trap,
        AUTOFIRE: true,
      },
    },
  ],
};
// Meme Tanks
exports.mrbombasticbombafantastic = {
  PARENT: [exports.genericTank],
  LABEL: 'Mr Bombastic BOMBA FANTASTIC',
  GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
    POSITION: [ 18, 20, 1, 0, 0, 0  ]
  }]
};

exports.mrbombasticbullet = {
  PARENT: [exports.genericTank],
  LABEL: '',
  COLOR: 36
};
let hexadoralTrapTurretArray = [];
for (let i = 0; i < 15; i++) {
  hexadoralTrapTurretArray.push({
    POSITION: [4, 9, 0, i * (360 / 15) + 360 / 15 / 2, 0, 0],
    TYPE: [
      exports.celestialTrapTurret,
      { CONTROLERS: ["nearestDifferentMaster"] },
    ],
  });
}
exports.hexadoralturret1 = {
  PARENT: [exports.autoTurret],
  LABEL: '',
  GUNS: [
    {
      POSITION: [15, 6, 1, 0, 4.5, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.hexadoralgun, g.doublereload, g.power, g.power]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [15, 6, 1, 0, -4.5, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.hexadoralgun, g.doublereload, g.power, g.power]),
        TYPE: exports.bullet
      }
    }
  ]
}
exports.hexadoralturret2 = {
  PARENT: [exports.autoTurret],
  LABEL: '',
  GUNS: [
    {
      POSITION: [16, 15.5, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hexadoralgun, g.power, g.power]),
        TYPE: exports.bullet
      }
    }
  ]
}
exports.hexadoralturret3 = {
  PARENT: [exports.autoTurret],
  LABEL: '',
  GUNS: [
    {
      POSITION: [15, 10, 0.6, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.pound, g.pound, g.power, g.power]),
        TYPE: exports.swarm,
        COLOR_OVERRIDE: 12
      }
    }
  ]
}
exports.hexadoralturret4 = {
  PARENT: [exports.autoTurret],
  LABEL: '',
  
  GUNS: (()=>{
    var gs = []
    exports.hiveshooter.GUNS.forEach(e=>{
      gs.push({
        POSITION: [
          e.POSITION[0],
          e.POSITION[1],
          e.POSITION[2],
          e.POSITION[3],
          e.POSITION[4],
          e.POSITION[5],
          e.POSITION[6]
        ],
        PROPERTIES: e.PROPERTIES
      })
    })
    return gs
  })()
}
exports.hexadoralturret5 = {
  PARENT: [exports.autoTurret],
  LABEL: '',
  GUNS: (()=>{
    var gs = []
    exports.stream.GUNS.forEach(e=>{
      gs.push({
        POSITION: [
          e.POSITION[0],
          e.POSITION[1],
          e.POSITION[2],
          e.POSITION[3],
          e.POSITION[4],
          e.POSITION[5],
          e.POSITION[6]
        ],
        PROPERTIES: e.PROPERTIES
      })
    })
    return gs
  })()
}
exports.hexadoralbody1 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  COLOR: 3,
  SHAPE: 5,
  CONTROLLERS: ['reverseslowspin'],
  TURRETS: (()=>{
   var hbd = []
   for (let i = 0.5; i < 5; i++) {
     hbd.push({
       POSITION: [8, 8, 0, (360 * i) / 5, 180, 0],
       TYPE: exports.hexadoralturret5
     })
   }
    return hbd
  })()
}
exports.hexadoralbody2 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  COLOR: 3,
  SHAPE: 7,
  CONTROLLERS: ['spin'],
  TURRETS: (()=>{
   var hbd = []
   for (let i = 0.5; i < 7; i++) {
     hbd.push({
       POSITION: [8, 8, 0, (360 * i) / 7, 180, 0],
       TYPE: exports.hexadoralturret4
     })
   }
    return hbd
  })()
}
exports.hexadoralbody3 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  COLOR: 3,
  SHAPE: 9,
  CONTROLLERS: ['reverseslowspin'],
  TURRETS: (()=>{
   var hbd = []
   for (let i = 0.5; i < 9; i++) {
     hbd.push({
       POSITION: [8, 8, 0, (360 * i) / 9, 180, 0],
       TYPE: exports.hexadoralturret3
     })
   }
    return hbd
  })()
}
exports.hexadoralbody4 = {
  PARENT:[exports.genericTank],
  LABEL: '',
  COLOR: 3,
  SHAPE: 11,
  CONTROLLERS: ['spin'],
  TURRETS: (()=>{
   var hbd = []
   for (let i = 0.5; i < 11; i++) {
     hbd.push({
       POSITION: [6, 8, 0, (360 * i) / 11, 180, 0],
       TYPE: exports.hexadoralturret2
     })
   }
    return hbd
  })()
}
exports.hexadoralbody5 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  COLOR: 3,
  SHAPE: 13,
  CONTROLLERS: ['reverseslowspin'],
  TURRETS: (()=>{
   var hbd1 = []
   for (let i = 0.5; i < 13; i++) {
     hbd1.push({
       POSITION: [5, 8, 0, (360 * i) / 13, 180, 0],
       TYPE: exports.hexadoralturret1
     })
   }
    return hbd1
  })()
}
exports.hexadoral = {
  PARENT: [exports.miniboss],
  LABEL: 'Hexadoral',
  SHAPE: 15,
  COLOR: 3,
  BODY: {
    HEALTH: base.HEALTH * 15 * 13,
    DAMAGE: base.DAMAGE * 4,
    SPEED: base.SPEED * 0.06
  },
  SIZE: 200,
  VALUE: 100000000,
  TURRETS: [
    ...hexadoralTrapTurretArray,
    {
      POSITION: [16, 0, 0, 0, 360, 1],
      TYPE: exports.hexadoralbody5,
    },
    {
      POSITION: [13, 0, 0, 0, 360, 1],
      TYPE: exports.hexadoralbody4,
    },
    {
      POSITION: [9, 0, 0, 0, 360, 1],
      TYPE: exports.hexadoralbody3,
    },
    {
      POSITION: [6, 0, 0, 0, 360, 1],
      TYPE: exports.hexadoralbody2,
    },
    {
      POSITION: [3, 0, 0, 0, 360, 1],
      TYPE: exports.hexadoralbody1,
    },
  ]
}
exports.ul_basic = {
    PARENT: [exports.miniboss],
    LABEL: 'Ultra Basic',
    FACING_TYPE: 'locksFacing',
    SKILL: skillSet({
        rld: .7,
        dam: .5,
        pen: .8,
        str: .8,
        spd: .2,
        atk: .3,
        hlt: 0,
        shi: 0,
        rgn: .7,
        mob: 1
    }),
    BODY: {
      HEALTH: 125000,
      DAMAGE: 1,
      SPEED: 1.2125
    },
  VALUE: 200e6,
  SIZE: 225,
  CAN_BE_ON_LEADERBOARD: true,
  //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
            SKIN: 0,                    // def
        }, }, 
    ],
};
exports.sandstormbody3 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 4,
  COLOR: 36,
  CONTROLLERS: ['reverseslowspin']
}
exports.sandstormbody4 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 4,
  COLOR: 36,
  CONTROLLERS: ['slowspin']
}
exports.storm = {
  PARENT: [exports.genericTank],
  LABEL: 'Storm',
  VALUE: 27000,
  CONTROLLERS: ['sandstorm'],
  SIZE: 20,
  TURRETS: [
    {
      POSITION: [10, 0, 0, 0, 360, 1],
      TYPE: [exports.sandstormbody3]
    },{
      POSITION: [6, 0, 0, 0, 360, 1],
      TYPE: [exports.sandstormbody4]
    }
  ],
  FACING_TYPE: 'autospin',
  SHAPE: 5,
}
exports.basicceptionist = {
  PARENT: [exports.genericTank],
  LABEL: 'Ceptionist',
   GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.ceptionistbullet]),
}
// UPGRADE PATHS
// Testbed Stuff
exports.bosses.UPGRADES_TIER_1 = [exports.kronos, exports.ragnarok, exports.alviss, exports.tyr, exports.zaphkiel, exports.xukmes, exports.paladin, exports.freyja, exports.enyo, exports.nestKeeper, exports.elite_battleship, exports.elite_destroyer, exports.elite_gunner, exports.elite_sprayer, exports.bossespg2];
exports.misc.UPGRADES_TIER_1 = [exports.cursedtank, exports.mothership, exports.mazeWallShooter, exports.baseProtector];                 
exports.betatestermisc.UPGRADES_TIER_1 = [exports.arrasmayhem, exports.arrasmayhem2, exports.arrasmayhem3, exports.cursedtank, exports.mothership, exports.baseProtector];
exports.arenaclosers.UPGRADES_TIER_1 = [exports.arenaCloser];
exports.testbed.UPGRADES_TIER_1 = [exports.basic, exports.testbedtanks, exports.seniortester, exports.betatester, exports.bosses, exports.misc, exports.arenaclosers, exports.optanks, exports.testbedpg2];
exports.optanks.UPGRADES_TIER_1 = [exports.arrasmayhem, exports.arrasmayhem2, exports.arrasmayhem3];
// Testbed page 2
exports.testbedpg2.UPGRADES_TIER_1 = [exports.polygongenerators, exports.rainbowtestbed, exports.testbedpg3];
exports.testbedpg3.UPGRADES_TIER_1 = [exports.testbed];
exports.polygongenerators.UPGRADES_TIER_1 = [exports.crystalgenerator, exports.diamondicosagongenerator];
// Testbed Tanks

exports.testbedtanks.UPGRADES_TIER_1 = [exports.testbedpg2, exports.bigbean, exports.furnace, exports.m,
exports.rider, exports.basicceptionist];
// Boss Stuff
exports.bossespg2.UPGRADES_TIER_1 = [exports.bossespg3, exports.bosses, exports.thedisease, exports.ganymede, exports.nyx, exports.theia, exports.ridan, exports.glitchton, exports.magmaporous, exports.legion_crash, exports.bossCele, exports.sabazios, exports.pleistoros, exports.trimurti, exports.derzelas, exports.eliterifle];
exports.bossespg3.UPGRADES_TIER_1 = [exports.bossespg2, exports.super_uzi, exports.elite_spinner, exports.abyssling, exports.legion_crash, exports.egger, exports.abyssguardian, exports.abyssling, exports.buggedabyssling, exports.buggedabyssguardian];
// Beta Tester Stuff
exports.betatesterbosses.UPGRADES_TIER_1 = [exports.nestKeeper, exports.elite_battleship, exports.elite_destroyer, exports.elite_gunner, exports.super_uzi, exports.elite_sprayer, exports.elite_devourer, exports.bossCele, exports.sabazios, exports.pleistoros, exports.trimurti, exports.derzelas];
exports.betatester.UPGRADES_TIER_1 = [exports.basic, exports.betatesterbosses, exports.betatesteroptanks, exports.betatestermisc, exports.dual, exports.spectator];
// Senior Tester Stuff
exports.seniortester.UPGRADES_TIER_1 = [exports.basic, exports.betatester, exports.seniortesterdominators];
exports.seniortesterdominators.UPGRADES_TIER_1 = [exports.basic, exports.dominator, exports.gunnerDominator, exports.trapperDominator];
exports.seniortesterbosses.UPGRADES_TIER_1 = [exports.nestKeeper, exports.elite_battleship, exports.elite_destroyer, exports.elite_gunner, exports.super_uzi, exports.elite_sprayer, exports.elite_devourer, exports.bossCele, exports.sabazios, exports.pleistoros, exports.trimurti, exports.derzelas];

//exports.oldbetatester.UPGRADES_TIER_1 = [exports.basic,exports.supertest,exports.indust,exports.miner,exports.imposter,exports.nap,exports.furnace,exports.dumptruck,exports.exploder,exports.balli,exports.gen,exports.scattergun,exports.lancer,exports.archer,exports.betatester2,];
//exports.betatester2.UPGRADES_TIER_1 = [exports.oldbetatester, exports.teaser,exports.donutbasic,exports.demoman,exports.farmer,exports.poprocks]
//exports.testbed7.UPGRADES_TIER_1 = [exports.bullet, exports.casing, exports.flare, exports.swarm, exports.bee, exports.autoswarm, exports.homingbullet, exports.accelbullet, exports.growbullet, exports.trap, exports.block, exports.boomerang, exports.drone, exports.testbed9]
//exports.testbed8.UPGRADES_TIER_1 = [exports.sunchip, exports.autosunchip, exports.invissunchip, exports.gunchip, exports.missile, exports.twistmissile, exports.hypermissile, exports.snake, exports.hive]


// Tanks

//,

//exports.punishment.UPGRADES_TIER_1 = [] 

exports.basic.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.machine, exports.trapper, exports.flank, exports.director];

     exports.trapper.UPGRADES_TIER_2 = [exports.barrier, exports.quadtrapper1, exports.megatrapper]
       //exports.barrier.UPGRADES_TIER_3 = [exports.barricade]
       //exports.hexatrapper.UPGRADES_TIER_3 = [exports.hexatrap, exports.octotrapper]

    exports.basic.UPGRADES_TIER_2 = [exports.smash, exports.lancer, exports.single];
        exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash];

    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.volcano, exports.bent, exports.gunner, exports.hexa];
        exports.twin.UPGRADES_TIER_3 = [exports.triple];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.split, exports.autodouble, exports.bentdouble];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.spread, exports.benthybrid, exports.bentdouble, exports.triple];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.nailgun, exports.auto4,exports.machinegunner];
            exports.volcano.UPGRADES_TIER_3 = [exports.sentinel]

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.hunter, exports.mini, exports.builder];
        exports.sniper.UPGRADES_TIER_3 = [exports.bushwhack];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger, exports.falcon];
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach, exports.sidewind];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder, exports.engineer, exports.boomer];

    exports.machine.UPGRADES_TIER_2 = [exports.destroy, exports.artillery, exports.mini, exports.gunner];
        exports.machine.UPGRADES_TIER_3 = [exports.spray];
        exports.destroy.UPGRADES_TIER_3 = [exports.anni, exports.hybrid, exports.construct, exports.shotgun2];
        //exports.anni.UPGRADES_TIER_3 = [exports.damager];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.skimmer];
        exports.mini.UPGRADES_TIER_3 = [exports.stream, exports.nailgun];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap];
        exports.flank.UPGRADES_TIER_3 = [];
        exports.tri.UPGRADES_TIER_3 = [exports.fighter, exports.booster, exports.falcon, exports.bomber, exports.autotri];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo, exports.hexatrap];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3, exports.auto4];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.bushwhack, exports.guntrap, exports.fortress, exports.bomber];

    exports.director.UPGRADES_TIER_2 = [exports.overseer, exports.cruiser, exports.underseer];
        exports.director.UPGRADES_TIER_3 = [exports.factory, exports.cutspwn, exports.bigcheese];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.overtrap, exports.overgunner];  
        exports.underseer.UPGRADES_TIER_3 = [exports.necromancer, exports.pentamancer, exports.hexamancer];
        exports.cruiser.UPGRADES_TIER_3 = [exports.carrier, exports.battleship, exports.fortress]; 