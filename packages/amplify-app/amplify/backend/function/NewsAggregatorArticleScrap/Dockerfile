FROM lambci/lambda:build-python3.8

ARG version=3.8

WORKDIR /build

RUN pip install newspaper3k -t .

# Setup directory for NLTK_DATA
RUN mkdir -p ./nltk_data

# Download NLTK_DATA to build directory
RUN python -W ignore -m nltk.downloader brown -d //nltk_data
RUN python -W ignore -m nltk.downloader punkt -d /build/nltk_data
RUN python -W ignore -m nltk.downloader maxent_treebank_pos_tagger -d /build/nltk_data
RUN python -W ignore -m nltk.downloader movie_reviews -d /build/nltk_data
RUN python -W ignore -m nltk.downloader wordnet -d /build/nltk_data
RUN python -W ignore -m nltk.downloader stopwords -d /build/nltk_data