Syntax examples:

Format:
---

Say this (new lines represent a 2+ second pause)

Gives this code

----

line print text hello world

print "hello world"

----

loop index 1 through 20
loop one line print text hello world

for index in range(1,20):
  print "hello world"

----

from random import random
define do
in function do execute random and store the result in h
in function do add the line print h
execute do

def do():
  h = random()
  print h
do()

----

import turtle
line steve equals new turtle
steve dot execute forward with the argument 90

import turtle
steve = turtle.Turtle()
steve.forward(90)

----

import turtle
line steve equals new turtle
loop index 1 through 20
loop one line steve dot execute forward argument index times three
loop one line steve dot execute left argument 90

import turtle
steve = turtle.Turtle()
for index in range(1, 20):
  steve.forward(index*3)
  steve.left(90)

----