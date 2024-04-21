from flask import Flask, request, jsonify
import numpy as np
import re
from nltk.corpus import stopwords
from nltk.stem.snowball import SnowballStemmer
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

with open('logReg_model.pkl', 'rb') as model_file:
    logReg = pickle.load(model_file)
with open('count_vectorizer.pkl', 'rb') as vectorizer_file:
    cv = pickle.load(vectorizer_file)

def preprocess_input(review):
    review = re.sub(re.compile(r'<.*?>'), '', review)
    review = re.sub(r'[^a-zA-Z\s]', '', review)
    review = review.lower()
    stop_words = set(stopwords.words('english'))
    words = word_tokenize(review)
    filtered_words = [w for w in words if w not in stop_words]
    stemmer = SnowballStemmer('english')
    stemmed_words = [stemmer.stem(w) for w in filtered_words]
    return ' '.join(stemmed_words)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    review = data['review']
    preprocessed_review = preprocess_input(review)
    bow = cv.transform([preprocessed_review]).toarray()
    prediction = logReg.predict(bow)[0]
    result = "positive" if prediction == 1 else "negative"
    return jsonify({"prediction": result})

if __name__ == '__main__':
    app.run(debug=True)