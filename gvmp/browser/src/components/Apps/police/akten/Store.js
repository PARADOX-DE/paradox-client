export default {
    person: {
        name: "",
        address: "",
        membership: "",
        phone: "",
        info: "",
        canAktenView: false,
        change: false,
        licenses: []
    },
    wanteds: {
        crimes: [],
        sumjailtime: 0,
        sumjailcosts: 0,
        categories: [
            {name:"cat1", id:1},
            {name:"cat2", id:2},
            {name:"cat3", id:3},
            {name:"cat4", id:4},
            {name:"cat5", id:5},
            {name:"cat6", id:6},
            {name:"cat7", id:7},
            {name:"cat8", id:8},
            {name:"cat9", id:9},
            {name:"cat10", id:10}
        ],
        reasons: [
          {name:"res1", id:1},
          {name:"res2", id:2},
          {name:"res3", id:3},
          {name:"res4", id:4},
          {name:"res5", id:5},
          {name:"res6", id:6},
          {name:"res7", id:7},
          {name:"res8", id:8},
          {name:"res9", id:9},
          {name:"res10", id:10}
        ]
    },
    act: {
        title: "",
        created: "",
        closed: "",
        officer: "",
        open: true,
        number: 0,
        text: ""
    },
    acts: {
        list: [{
            title: "test",
            created: "",
            closed: "",
            officer: "T",
            open: false,
            number: 3,
            text: "t"
        },{
            title: "test",
            created: "2001-11-11T00:00",
            closed: "2001-11-11T00:00",
            officer: "T",
            open: false,
            number: 3,
            text: "t"
        }]
    },
    requestData() {

    },
    setData(result) {
        this.person = result.person
        this.wanteds = result.wanteds
    }
}