import _ from 'lodash';

const addPhrase = (phrase, frequentPhrases) => {
  frequentPhrases[phrase] = frequentPhrases[phrase] ? frequentPhrases[phrase] + 1 : 1;
}

/*
  Calculates the phrases that appear in a given sentence and puts them into a frequentPhrases map (key is phrase and value is count)
  @param sentence EX: ["Live", "long", "and", "prosper"]
  @param frequentPhrases a map of phrase frequencies
  @param phrasesToDelete the list of sub phrases that have been duplicated that are part of duplicated superphrases
  Mutate the frequentPhrases and phrasesToDelete as we go.EX: ["Live long and", "long and prosper", "live long and prosper"]
*/
const calculatePhrasesForSentence = (sentence, frequentPhrases, phrasesToDelete) => {
    if (sentence.length < 3) return [];
    const minPhraseLength = 3;
    const maxPhraseLength = 10;
    const lastRunIndex = sentence.length - minPhraseLength;

    for (let start = 0; start<=lastRunIndex; start++) {

        // get the initial phrase to work with and keep building on it
        let curPhrase = _.join(_.slice(sentence, start, start + minPhraseLength), ' ');
        addPhrase(curPhrase, frequentPhrases);

        for (let end = start + minPhraseLength; end < sentence.length && end < start + maxPhraseLength; end++) {
            // get from start to end
            const subPhrase = curPhrase;
            curPhrase = `${curPhrase} ${sentence[end]}`;

            // the subPhrase and the curPhrase have both been duplicated (don't let the subPhrase show up)
            if (frequentPhrases[subPhrase] > 1 && frequentPhrases[curPhrase])
                 phrasesToDelete.push(subPhrase);

            addPhrase(curPhrase, frequentPhrases);
        }
    }
};

const calculateFrequentPhrases = (textdocument) => {
    // split based on sentances (phrase cannot span sentences rule)
    const sentences = _.split(textdocument, '.');
    const frequentPhrases = {};
    const phrasesToDelete = [];

    _.forEach(sentences, sentence => {
        // Clean up the sentence (lowercase, remove empty values)
        let loSentence = _.split(sentence.toLowerCase(), ' ');
        loSentence = _.without(loSentence, "");
        calculatePhrasesForSentence(loSentence, frequentPhrases, phrasesToDelete);
    });

    // delete all of the sub phrases that were duplicated
    _.forEach(phrasesToDelete, subPhrase => delete frequentPhrases[subPhrase]);

    // find the top ten (sort then grab the top 10)
    const phrasesSorted = _.keys(frequentPhrases).sort((a, b) => frequentPhrases[b] - frequentPhrases[a]);
    if (_.keys(frequentPhrases).length < 10) return { phrasesSorted, frequentPhrases };
    phrasesSorted.length = 10;
    // output the frequentPhrases object to get counts if we want them
    return { phrasesSorted, frequentPhrases };
};

export default calculateFrequentPhrases;
