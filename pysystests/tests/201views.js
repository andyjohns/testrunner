{
	"name" : "orange",
	"desc" : "views_201_160,
	"loop" : false,
	"phases" :{
		"0" :
		{
			"name" : "load_init",
			"desc" : "load 30M items",
			"workload" : [{"spec" : "s:100,ccq:default1keys,ops:10000",
							"conditions" : "post:curr_items > 40000000"},
							{"spec" : "b:saslbucket,pwd:password,s:100,ccq:sasl1keys,ops:10000",
							"conditions" : "post:curr_items > 30000000"}]
		},
		"1" :
		{
			"name" : "drain_disks_1",
			"desc" : "draining the disks",
			"workload" : [{"bucket" : "default", "template" : "default",
							"spec" : "g:100,coq:defaultph1keys,ops:100",
							"conditions" : "post:ep_queue_size < 100"},
							{"bucket" : "saslbucket", "template" : "default",
							"spec" : "g:100,coq:sasl1keys,ops:100",
							"conditions" : "post:ep_queue_size < 100"}]
		},
		"2" :
		{
			"name" : "load_dgm",
			"desc" :  "load 10M items",
			"workload" : [{"spec" : "s:100,ccq:default2keys,ops:15000",
							"conditions" : "post:curr_items > 80000000"},
							{"spec" : "b:saslbucket,pwd:password,s:100,ccq:sasl2keys,ops:15000",
							"conditions" : "post:curr_items > 65000000"}]
		},
		"3" :
		{
			"name" : "drain_disks_2",
			"desc" : "draining the disks",
			"workload" : [{"bucket" : "default", "template" : "default",
							"spec" : "g:100,coq:defaultph2keys,ops:100",
							"conditions" : "post:ep_queue_size < 100"},
							{"bucket" : "saslbucket", "template" : "default",
							"spec" : "g:100,coq:sasl2keys,ops:100",
							"conditions" : "post:ep_queue_size < 100"}]
		},
		"4" :
		{
			"name" : "access_phase",
			"desc" :  "prepare to create cachemiss",
			"workload" : [{"bucket" : "default",
							"template" : "default",
							"spec" : "s:10,u:10,g:75,d:5,ccq:default2keys,ops:30000"},
							{"spec" : "b:saslbucket,pwd:password,u:20,g:80,ccq:sasl2keys,ops:30000"}],
			"runtime" : 3600
		},
		"5" :
		{
			"name" : "rebalance_in_one",
			"desc" :  "RB1",
			"workload" : [{"bucket" : "default",
							"template" : "default",
							"spec" : "s:10,u:25,g:50,d:10,e:5,ttl:60000,ccq:default2keys,ops:10000"},
							{"spec" : "b:saslbucket,pwd:password,s:10,u:35,g:40,d:10,e:5,ttl:60000,ccq:sasl2keys,ops:10000"}],
			"runtime" : 32000
		},
		"6" :
		{
			"name" : "restart_all",
			"desc" :  "CR-3",
			"workload" : [{"spec" : "u:100,coq:default2keys,ops:10000"},
							{"spec" : "b:saslbucket,pwd:password,u:100,coq:sasl2keys,ops:10000"}],
			"runtime": 100
		}
	}
}
