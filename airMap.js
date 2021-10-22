'use strict';

class TestTemperatureMap extends TemperatureMap {
    getColor(levels, value) {

        var val = value,
            tmp = 0,
            lim = 0.55,
            min = -20,
            max = 40,
            dif = max - min,
            lvs = 25,
            result = [];

        if (val < min) {
            val = min;
        }
        if (val > max) {
            val = max;
        }

        val = (val / 5).toFixed(0) * 5;
        switch (val) {
            case -20:
                result = [149, 137, 211];
                break;
            case -15:
                result = [150, 209, 216];
                break;
            case -10:
                result = [129, 204, 197];
                break;
            case -5:
                result = [103, 180, 186];
                break;
            case 0:
                result = [95, 143, 197];
                break;
            case 5:
                result = [80, 140, 62];
                break;
            case 10:
                result = [149, 137, 211];
                break;
            case 15:
                result = [149, 137, 211];
                break;
            case 20:
                result = [149, 137, 211];
                break;
            case 25:
                result = [243, 150, 6];
                break;
            case 30:
                result = [236, 95, 21];
                break;
            case 35:
                result = [190, 65, 18];
                break;
            case 40:
                result = [103, 180, 186];
                break;
        }

        return result;
    }
}