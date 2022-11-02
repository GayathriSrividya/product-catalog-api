"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./routes/router");
const mongoose_1 = __importDefault(require("mongoose"));
const config_json_1 = __importDefault(require("./config/config.json"));
const port = config_json_1.default.port;
const options = {
    useNewUrlParser: true
};
mongoose_1.default.connect(config_json_1.default.dbUri, options);
let app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', router_1.router);
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
exports.default = app;
