# user input : size of image ( width, height) , number of classification categories (nClass) , number of training steps = nTrain
# learning rate : alpha, zipFileName :


#import tensorflow.examples.tutorials.mnist.input_data
import input_data
import zipfile
import sys, json, demjson
import os

##print(os.getcwd())
#change directory to that of script
abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)
##print(os.getcwd())

#lines = sys.stdin.readlines()
#lines = lines[0]
lines = sys.argv[1]
#print lines
#lines = lines[0].replace("\\", "")
#lines = lines[1:len(lines)-1]
#print lines

##print "as"
##print lines[0]
#lines = '{"width":"28","height":"28","nClass":"10","alpha":"0.01"}'


paramtersDict = demjson.decode(lines)
##print paramtersDict

##print paramtersDict

zip_ref = zipfile.ZipFile(paramtersDict["File Name"]+".zip", 'r')
zip_ref.extractall()
zip_ref.close()


#mnist = input_data.read_data_sets("MNIST_data", one_hot=True)
mnist = input_data.read_data_sets(paramtersDict["File Name"], one_hot=True)

#print "Loaded data."

import tensorflow as tf

EVAL_FREQUENCY = 100;
NUM_EPOCHS = 10;
BATCH_SIZE = 100;
TRAIN_SIZE = 1000;

size = int(paramtersDict['width']) * int(paramtersDict['height'])
#print "Input Vector Length : ",size

nClass = int(paramtersDict['nClass'])
#print "Number of Classes : ", nClass

alpha = float(paramtersDict['alpha'])
#print "Learning Rate : ", alpha

#nClass = 10
#alpha = 0.01


x = tf.placeholder(tf.float32, [None, size])
W = tf.Variable(tf.zeros([size, nClass]))
b = tf.Variable(tf.zeros([nClass]))
y = tf.nn.softmax(tf.matmul(x, W) + b)
y_ = tf.placeholder(tf.float32, [None, nClass])
cross_entropy = -tf.reduce_sum(y_*tf.log(y))
train_step = tf.train.GradientDescentOptimizer(alpha).minimize(cross_entropy)
init = tf.initialize_all_variables()

saver = tf.train.Saver()


sess = tf.Session()
sess.run(init)

training_result_list = []

for i in range(int(TRAIN_SIZE)):
  batch_xs, batch_ys = mnist.train.next_batch(int(BATCH_SIZE))
  sess.run(train_step, feed_dict={x: batch_xs, y_: batch_ys})
  if i % EVAL_FREQUENCY == 0:
	  correct_prediction = tf.equal(tf.argmax(y,1), tf.argmax(y_,1))
	  accuracy = tf.reduce_mean(tf.cast(correct_prediction, "float"))
	  loss = tf.reduce_mean(cross_entropy, name='xentropy_mean')
	  accuracy_value, loss_value = sess.run([accuracy, loss], feed_dict={x: mnist.test.images, y_: mnist.test.labels})
	  epoch = float(i) * BATCH_SIZE / TRAIN_SIZE
	  #print("Step %d (Epoch %.2f)" % (i, epoch))
	  #print(accuracy_value, loss_value)
	  training_result = {'Epoch':epoch, 'Accuracy':str(accuracy_value)}
	  training_result_list.append(training_result)
	  #print(json.dumps(training_result_list))
	  sys.stdout.flush()
#print(paramtersDict["File Name"]+"_"+str(paramtersDict["modelID"])+".ckpt")
saver.save(sess, paramtersDict["File Name"]+"_"+str(paramtersDict["modelID"])+".ckpt");

correct_prediction = tf.equal(tf.argmax(y,1), tf.argmax(y_,1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, "float"))
accuracy_value = sess.run(accuracy, feed_dict={x: mnist.test.images, y_: mnist.test.labels})
epoch = float(TRAIN_SIZE) * BATCH_SIZE / TRAIN_SIZE
training_result = {'Epoch':epoch, 'Accuracy':str(accuracy_value)}
training_result_list.append(training_result)
#training_result_list.append({'Status':'Success'})
print(json.dumps(training_result_list))
