/**
 * Cinema Pro Suite - Master All-In-One VIP Engine Module
 * Re-exports the complete modular VIP engine suite for backwards compatibility.
 */

const { getVipCode } = require("./vip");

module.exports = getVipCode("all");
