/*jslint node: true */
/*jshint -W061 */
/*global goog, Map, let */
"use strict";
// General requires
require('google-closure-library');
goog.require('goog.structs.PriorityQueue');
goog.require('goog.structs.QuadTree');

function generateWaves() {
    let bosses = [Class.elite_destroyer, Class.elite_gunner, Class.elite_sprayer, Class.elite_battleship, Class.palisade, Class.skimboss, Class.summoner, Class.egger, Class.nestKeeper].sort(() => 0.5 - Math.random());
    let stormlevel1 = [Class.eliterifle, Class.elite_devourer].sort(() => 0.5 - Math.random());
    let stormlevel2 = [Class.paladin, Class.theia, Class.sabazios].sort(() => 0.5 - Math.random());
    let stormlevel3 = [Class.nyx, Class.alviss, Class.fiolnir].sort(() => 0.5 - Math.random());
    let ragnarok = [Class.ragnarok].sort(() => 0.5 - Math.random());
    let kronos = [Class.kronos].sort(() => 0.5 - Math.random());
    let eternalpain = [Class.ridan, Class.legion_crash, Class.glitchton].sort(() => 0.5 - Math.random());
    let Finallevel = [Class.hexadoral, Class.basic_ul]
    let waves = [];
    for (let i = 0; i < 75; i++) {
        let wave = [];
        for (let j = 0; j < 2 + Math.random() * 4 + (i * .4); j++) wave.push(bosses[j]);
        bosses = bosses.sort(() => 0.5 - Math.random());
        waves.push(wave);
        if (i >= 10) {
          let wave2 = [];
          for (let j = 0; j < 2 + Math.random() * 4 + (i * .4); j++) wave2.push(stormlevel1[j]);
          stormlevel1 = stormlevel1.sort(() => 0.5 - Math.random());
          waves.push(wave2);
        }
        if (i >= 20) {
          let wave3 = [];
          for (let j = 0; j < 2 + Math.random() * 4 + (i * .4); j++) wave3.push(stormlevel2[j]);
          stormlevel2 = stormlevel2.sort(() => 0.5 - Math.random());
          waves.push(wave3);
        }
        if (i >= 30) {
          let wave4 = [];
          for (let j = 0; j < 2 + Math.random() * 4 + (i * .4); j++) wave4.push(stormlevel3[j]);
          stormlevel3 = stormlevel3.sort(() => 0.5 - Math.random());
          waves.push(wave4);
        }
        if (i >= 40) {
          let wave6 = [];
          for (let j = 0; j < 2 + Math.random() * 4 + (i * .4); j++) wave6.push(ragnarok[j]);
          ragnarok = ragnarok.sort(() => 0.5 - Math.random());
          waves.push(wave6);
        }
        if (i >= 50) {
          let wave7 = [];
          for (let j = 0; j < 2 + Math.random() * 4 + (i * .4); j++) wave7.push(kronos[j]);
          kronos = kronos.sort(() => 0.5 - Math.random());
          waves.push(wave7);
        }
        if (i >= 60) {
          let wave8 = [];
          for (let j = 0; j < 2 + Math.random() * 4 + (i * .4); j++) wave8.push(eternalpain[j]);
          eternalpain = eternalpain.sort(() => 0.5 - Math.random());
          waves.push(wave8);
        }
        if (i >= 70) {
          let Finallevel = [];
          for (let j = 0; j < 2 + Math.random() * 4 + (i * .4); j++) Finallevel.push(Finallevel[j]);
          Finallevel = Finallevel.sort(() => 0.5 - Math.random());
          waves.push(Finallevel);
        }
    }
    return waves;
};
const bossRush = (function() {
    let mothershipChoices = [Class.mothership];
    let waves = generateWaves();
    let wave = -1;
    let gameActive = true;
    let timer = 0;

    function spawnMothership() {
        return;
        sockets.broadcast("A Mothership has spawned!");
        let o = new Entity(room.randomType("bas1"));
        o.define(ran.choose(mothershipChoices));
        o.define({
            DANGER: 10
        });
        o.color = 10
        o.team = -1
        o.name = "Mothership";
        o.isMothership = true;
        o.controllers.push(new ioTypes.nearestDifferentMaster(o));
        o.controllers.push(new ioTypes.botMovement(o));
    };
    let spawn = (loc, team, type = false) => {
        type = type ? type : Class.sanctuary;
        let o = new Entity(loc);
        o.define(type);
        o.team = team;
        o.color = [10, 11, 12, 15][-team - 1] || 3;
        o.skill.score = 111069;
        o.name = "Dominator";
        o.SIZE = c.WIDTH / c.X_GRID / 10;
        o.isDominator = true;
        o.controllers = [new ioTypes.nearestDifferentMaster(o), new ioTypes.spinWhenIdle(o)];
        o.onDead = function() {
            if (o.team === -100) {
                spawn(loc, -1, type);
                room.setType("dom1", loc);
                sockets.broadcast("A dominator has been captured by BLUE!");
            } else {
                spawn(loc, -100, type);
                room.setType("dom0", loc);
                sockets.broadcast("A dominator has been captured by the bosses!");
            }
        };
    };

    function init() {
        for (let i = 0; i < 1; i++) spawnMothership();
        for (let loc of room["bas1"]) spawn(loc, -1);
        console.log("Boss rush initialized.");
    };

    function getCensus() {
        let census = {
            bosses: 0,
            motherships: 0
        }
        loopThrough(entities, function(entry) {
            if (entry.isBoss) census.bosses++;
            if (entry.isMothership) census.motherships++;
        });
        return census;
    };

    function loop() {
        let census = getCensus();
        if (census.motherships < 1) spawnMothership();
        if (census.bosses === 0 && timer <= 0) {
            wave++;
            if (!waves[wave]) {
                if (!gameActive) return;
                gameActive = false;
                sockets.broadcast("BLUE has won the game!");
                setTimeout(closeArena, 1500);
                return;
            }
            sockets.broadcast(`Wave ${wave + 1} has arrived!`);
            for (let boss of waves[wave]) {
                let spot, m = 0;
                do {
                    spot = room.randomType("nest");
                    m++;
                } while (dirtyCheck(spot, 500) && m < 30);
                let o = new Entity(spot);
                o.define(boss);
                o.define({
                    DANGER: 25 + o.SIZE / 5
                });
                o.team = -100;
                o.FOV = 10;
                o.refreshBodyAttributes();
                o.isBoss = true;
                o.controllers.push(new ioTypes.bossRushAI(o));
                for (let i = 0; i < 2; i++) {
                    let n = new Entity(room.randomType("nest"));
                    n.define(ran.choose([Class.sentryGun, Class.sentrySwarm, Class.sentryTrap]));
                    n.team = -100;
                    n.FOV = 10;
                    n.refreshBodyAttributes();
                    n.controllers.push(new ioTypes.bossRushAI(n));
                }
                for (let i = 0; i < 4; i++) {
                    let n = new Entity(room.randomType("nest"));
                    n.define(Class.crasher);
                    n.team = -100;
                    n.FOV = 10;
                    n.refreshBodyAttributes();
                    n.controllers.push(new ioTypes.bossRushAI(n));
                }
            }
        } else if (census.bosses > 0) timer = 5;
        timer--;
    };
    return {
        init,
        loop
    };
})();

module.exports = {
    bossRush
};