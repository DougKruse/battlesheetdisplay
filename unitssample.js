var units = {
  sampleunit: {name:"Sample Unit",shortName:"sampleunit", m:1, ws:2, bs:3, s:4, t:5, w:6, a:7, ld:8, sv:9, type:"TYPE", pow:0,
    equipment: "This is a sample unit, description goes here",
    weapons: function(){return flat(["sample_weapon", "sample_weapon2"]);},
    abilities: [
            {name:"Rule 1",
              rules:"rules go here"
            },
            {name:"Rule 2",
              rules:"More rules"
            },

    ],
    wargear: ["Options go here"],
    psyker: ["psyker rules"],
    factions: ["these", "are", "4", "factions"],
    keywords: ["keywords", "go", "here", "sample"]
  },

  samplevehicle: {name:["Vehicle", "Vehicle Degraded Once", "Vehicle Degraded Twice"],shortName:"samplevehicle", m:["3","2","1"], ws:[3,3,3], bs:[4,5,6], s:[1,1,1], t:[0,0,0], w:[1,2,3], a:[3,"D3",1], ld:[7,7,7], sv:[3,3,3], type:"TYPE", pow:0,
    equipment: "Vehicle description",
    weapons: function(){ return flat([weaponlists.sample_list]);},
    abilities: [
          {name:"Rule 1",
            rules:"rules go here"
          },
          {name:"Rule 2",
            rules:"More rules"
          },
    ],
    wargear: ["Vehicle Options"],
    factions: ["faction", "tags"],
    keywords: ["Vehicle", "sample"],
  },
};
