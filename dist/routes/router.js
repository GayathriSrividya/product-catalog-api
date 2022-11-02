"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../models/model"));
let router = express_1.default.Router();
exports.router = router;
router.get('/', (req, res) => {
    res.send('hello, welcome to our product catalog');
});
router.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let prod = yield model_1.default.find();
        res.status(200);
        res.json(prod);
    }
    catch (err) {
        res.send(err);
    }
}));
router.get('/products/:pid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pid = req.params.pid;
    try {
        const prod = yield model_1.default.find({ "pid": pid });
        if (prod.length == 0) {
            res.status(404).send(`product with id '${pid}' does not exists`);
        }
        else {
            res.send(prod);
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
router.post('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEntry = new model_1.default({
            pid: req.body.pid,
            name: req.body.name,
            price: req.body.price
        });
        yield newEntry.save();
        res.status(200).send(newEntry);
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
router.put('/products/:pid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pid = req.params.pid;
    try {
        const prod = yield model_1.default.find({ "pid": pid });
        if (prod.length == 0) {
            res.status(404).send(`product with id '${pid}' does not exists`);
            return;
        }
        model_1.default.updateOne(req.body);
        res.status(200).send('entry updated successfully');
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
router.delete('/products/:pid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pid = req.params.pid;
    try {
        const prod = yield model_1.default.find({ "pid": pid });
        if (prod.length == 0) {
            res.status(404).send(`product with id '${pid}' does not exists`);
            return;
        }
        yield model_1.default.deleteOne({ "pid": pid });
        res.status(200).send('entry deleted');
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
