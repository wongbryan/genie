import detect

PATH_TO_REPO = '/home/kesavapr/genie/Genie-ML'

# Path to frozen detection graph. This is the actual model that is used for the object detection.
PATH_TO_CKPT = PATH_TO_REPO + '/frozen_inference_graph.pb'

# List of the strings that is used to add correct label for each box.
PATH_TO_LABELS = PATH_TO_REPO + '/server_scripts/data/wireframe_label_map.pbtxt'

NUM_CLASSES = 8

PATH_TO_IMAGE = PATH_TO_REPO + '/dataset/IMG_3249.jpg'

labels = detect.get_labels(PATH_TO_IMAGE, PATH_TO_CKPT, PATH_TO_LABELS, NUM_CLASSES)

print(labels)

