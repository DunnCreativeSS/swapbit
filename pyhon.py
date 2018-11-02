from bitshares.market import Market

import sys

import time
def dummy() :
	btseth=(Market("BTS:" + str(sys.argv[1])).orderbook(limit=50)['asks']) #ask selling
	btssmoke=(Market("BTS:" + str(sys.argv[2])).orderbook(limit=50)['bids']) #bid buying
	print(btssmoke)
	amt = float(sys.argv[3])
	eth = str(btseth)[1:int(i1)]
	smoke = str(btssmoke)[1:int(i2)]
	print (eth)
	print (smoke)
	print(out)
	sys.stdout.flush()

if __name__ =='__main__' :
    dummy = dummy()
