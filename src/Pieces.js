'use strict';

export default class Pieces {
    constructor(torrent) {
        function buidldPiecesArray() {
            const nPieces = torrent.info.pieces.length / 20;
            const arr = new Array(nPieces).fill(null);
            return arr.map((_, i) => new Array(torrentParser.blocksPerPiece(torrent, i)).fill(false));
        }

        this._requested = buidldPiecesArray();
        this._received = buidldPiecesArray();
    }

    addRequested(pieceBlock) {
        const blockIndex = pieceBlock.begin / torrentParser.BLOCK_LEN;
        this._requested[pieceBlock.index][blockIndex] = true;
    }

    addReceived(pieceBlock, buffer) {
        const blockIndex = pieceBlock.begin / torrentParser.BLOCK_LEN;
        this._received[pieceBlock.index][blockIndex] = buffer;
    }

    needed(pieceIndex) {
        if(this._requested.every(blocks => blocks.every(i => i))) {
            this._requested = this._received.map(blocks => blocks.slice());
        }
        const blockIndex = pieceBlock.begin / torrentParser.BLOCK_LEN;
        return !this._requested[pieceIndex][blockIndex];
    }

    isDone() {
        return this._received.every(blocks => blocks.every(i => i));
    }
};