'use strict';

class TemperatureMap {
    constructor(ctx) {

        this.ctx = ctx;
        this.points = [];
        this.polygon = [];
        this.limits = {
            xMin: 0,
            xMax: 0,
            yMin: 0,
            yMax: 0
        };
        this.size = { height: window.innerHeight, width: window.innerWidth }
    }

    crossProduct(o, a, b) {
        return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    }

    pointInPolygon(point, vs) {

        var x = point.x,
            y = point.y,
            inside = false,
            i = 0,
            j = 0,
            xi = 0,
            xj = 0,
            yi = 0,
            yj = 0,
            intersect = false;

        j = vs.length - 1;
        for (i = 0; i < vs.length; i = i + 1) {
            xi = vs[i].x;
            yi = vs[i].y;
            xj = vs[j].x;
            yj = vs[j].y;

            intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) { inside = !inside; }
            j = i;
        }

        return inside;
    }

    squareDistance(p0, p1) {

        var x = p0.x - p1.x,
            y = p0.y - p1.y;

        return x * x + y * y;
    }

    hslToRgb(h, s, l) {

        var r, g, b, hue2rgb, q, p;

        if (s === 0) {
            r = g = b = l;
        } else {
            this.hue2rgbhue2rgb(p, q, t);

            q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            p = 2 * l - q;
            r = this.hue2rgb(p, q, h + 0.33);
            g = this.hue2rgb(p, q, h);
            b = this.hue2rgb(p, q, h - 0.33);
        }

        return [(r * 255) | 0, (g * 255) | 0, (b * 255) | 0]; // (x << 0) = Math.floor(x)
    }

    hue2rgbhue2rgb(p, q, t) {
        if (t < 0) {
            t += 1;
        } else if (t > 1) {
            t -= 1;
        }

        if (t >= 0.66) {
            return p;
        } else if (t >= 0.5) {
            return p + (q - p) * (0.66 - t) * 6;
        } else if (t >= 0.33) {
            return q;
        } else {
            return p + (q - p) * 6 * t;
        }
    }

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
                result = [121, 146, 28];
                break;
            case 15:
                result = [171, 161, 14];
                break;
            case 20:
                result = [223, 177, 6];
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
                result = [138, 43, 10];
                break;
        }

        return result;
        // tmp = 1 - (1 - lim) - (((val - min) * lim) / dif);
        // // tmp = 1 - (((val - min) / dif) + 1/6);

        // if (levels) {
        //     tmp = Math.round(tmp * lvs) / lvs;
        // }

        // return hslToRgb(tmp, 1, 0.5);
    }



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
                result = [121, 146, 28];
                break;
            case 15:
                result = [171, 161, 14];
                break;
            case 20:
                result = [223, 177, 6];
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
                result = [138, 43, 10];
                break;
        }

        return result;
        // tmp = 1 - (1 - lim) - (((val - min) * lim) / dif);
        // // tmp = 1 - (((val - min) / dif) + 1/6);

        // if (levels) {
        //     tmp = Math.round(tmp * lvs) / lvs;
        // }

        // return hslToRgb(tmp, 1, 0.5);
    }

    getPointValue(limit, point) {

        var counter = 0,
            arr = [],
            tmp = 0.0,
            dis = 0.0,
            inv = 0.0,
            t = 0.0,
            b = 0.0,
            pwr = 2,
            ptr;

        // From : https://en.wikipedia.org/wiki/Inverse_distance_weighting

        if (this.pointInPolygon(point, this.polygon)) {

            for (counter = 0; counter < this.points.length; counter = counter + 1) {
                dis = this.squareDistance(point, this.points[counter]);
                if (dis === 0) {
                    return this.points[counter].value;
                }
                arr[counter] = [dis, counter];
            }

            arr.sort(function (a, b) { return a[0] - b[0]; });

            for (counter = 0; counter < limit; counter = counter + 1) {
                ptr = arr[counter];
                inv = 1 / Math.pow(ptr[0], pwr);
                t = t + inv * this.points[ptr[1]].value;
                b = b + inv;
            }

            return t / b;

        } else {
            return -255;
        }
    }

    setConvexhullPolygon(points) {

        var lower = [],
            upper = [],
            i = 0;

        // Sort by 'y' to get yMin/yMax
        points.sort(function (a, b) {
            return a.y === b.y ? a.x - b.x : a.y - b.y;
        });

        this.limits.yMin = points[0].y;
        this.limits.yMax = points[points.length - 1].y;

        // Sort by 'x' to get convex hull polygon and xMin/xMax
        points.sort(function (a, b) {
            return a.x === b.x ? a.y - b.y : a.x - b.x;
        });

        this.limits.xMin = points[0].x;
        this.limits.xMax = points[points.length - 1].x;

        // Get convex hull polygon from points sorted by 'x'
        for (i = 0; i < points.length; i = i + 1) {
            while (lower.length >= 2 && this.crossProduct(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
                lower.pop();
            }
            lower.push(points[i]);
        }

        for (i = points.length - 1; i >= 0; i = i - 1) {
            while (upper.length >= 2 && this.crossProduct(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
                upper.pop();
            }
            upper.push(points[i]);
        }

        upper.pop();
        lower.pop();
        this.polygon = lower.concat(upper);
    }

    setPoints(arr, width, height) {

        this.points = arr;
        this.width = width;
        this.height = height;
        this.setConvexhullPolygon(this.points);
    }

    setDataPoints(points, Maxwidth, Maxheight) {

        //設定點輸入
        var counter = 0,
            x = 0,
            y = 0,
            v = 0.0;
        rst = [];

        this.setPoints(rst, Maxwidth, Maxheight);
    }




    drawLow(limit, res, clean, callback) {

        var self = this,
            ctx = this.ctx,
            dbl = 2 * res,
            col = [],
            cnt = 0,
            x = 0,
            y = 0,
            val = 0.0,
            str = '',
            xBeg = self.limits.xMin,
            yBeg = self.limits.yMin,
            xEnd = self.limits.xMax,
            yEnd = self.limits.yMax,
            lim = limit > self.points.length ? self.points.length : limit + 1,
            gradient;

        ctx.clearRect(0, 0, this.size.width, this.size.height);
        ctx.width += 0;   //<=== Resizing the canvas will cause the canvas to get cleared.

        // Draw aproximation
        for (x = xBeg; x < xEnd; x = x + res) {
            for (y = yBeg; y < yEnd; y = y + res) {
                val = self.getPointValue(lim, { x: x, y: y });
                if (val !== -255) {
                    ctx.beginPath();  //<== beginpath
                    col = self.getColor(false, val);
                    str = 'rgba(' + col[0] + ', ' + col[1] + ', ' + col[2] + ', ';
                    gradient = ctx.createRadialGradient(x, y, 1, x, y, res);
                    gradient.addColorStop(0, str + '0.5)');
                    gradient.addColorStop(1, str + '0)');
                    ctx.fillStyle = "#191919"; //<=== must be filled white for properly render
                    ctx.fillStyle = gradient;
                    ctx.fillRect(x - res, y - res, dbl, dbl);
                    ctx.fill();
                    ctx.closePath(); //<== must be closed
                }
            }
        }

        // Erase polygon outsides
        if (clean && self.polygon.length > 1) {
            ctx.globalCompositeOperation = 'destination-in';
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.beginPath();
            ctx.moveTo(self.polygon[0].x, self.polygon[0].y);
            for (cnt = 1; cnt < self.polygon.length; cnt = cnt + 1) {
                ctx.lineTo(self.polygon[cnt].x, self.polygon[cnt].y);
            }
            ctx.lineTo(self.polygon[0].x, self.polygon[0].y);
            ctx.closePath();
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
        }

        if (typeof callback === 'function') {
            callback();
        }
    }

    drawFull(levels, callback) {
        'use strict';
        var self = this,
            ctx = this.ctx,
            img = this.ctx.getImageData(0, 0, self.width, self.height),
            data = img.data,
            step = 0,
            col = [],
            cnt = 0,
            idx = 0,
            x = self.limits.xMin,
            y = self.limits.yMin,
            w = self.width * 4,
            wy = w * y,
            lim = self.points.length,
            val = 0.0,
            tBeg = 0,
            tDif = 0,
            xBeg = self.limits.xMin,
            xEnd = self.limits.xMax,
            yEnd = self.limits.yMax,
            bucleSteps = 100.0,
            recursive = function() {
                window.requestAnimationFrame(function (timestamp) {

                    tBeg = (new Date()).getTime();
                    for (cnt = 0; cnt < bucleSteps; cnt = cnt + 1) {
                        val = self.getPointValue(lim, { x: x, y: y });
                        idx = x * 4 + wy;
                        if (val !== -255) {
                            col = self.getColor(levels, val);
                            data[idx] = col[0];
                            data[idx + 1] = col[1];
                            data[idx + 2] = col[2];
                            data[idx + 3] = 128;
                        }
                        x = x + 1;
                        if (x > xEnd) {
                            x = xBeg;
                            y = y + 1;
                            wy = w * y;
                        }
                    }

                    tDif = (new Date()).getTime() - tBeg;
                    if (tDif === 0) {
                        tDif = 1;
                    }
                    // bucleSteps = ((16 * bucleSteps) / tDif) * 0.5;
                    bucleSteps = (bucleSteps << 3) / tDif;

                    ctx.putImageData(img, 0, 0);

                    if (y < yEnd) {
                        recursive();
                    } else if (typeof callback === 'function') {
                        callback();
                    }
                });
            };

        recursive();
    }

    drawPoints(callback) {

        var self = this,
            PI2 = 2 * Math.PI,
            ctx = this.ctx;
        window.requestAnimationFrame(function (timestamp) {
            var col = [],
                idx = 0,
                pnt;

            // for (idx = 0; idx < self.points.length; idx = idx + 1) {
            //     pnt = self.points[idx];

            //     col = self.getColor(false, pnt.value);

            //     ctx.fillStyle = 'rgba(255, 255, 255, 128)';
            //     ctx.beginPath();
            //     ctx.arc(pnt.x, pnt.y, 8, 0, PI2, false);
            //     ctx.fill();

            //     ctx.lineWidth = 1;
            //     ctx.strokeStyle = 'rgb(' + col[0] + ', ' + col[1] + ', ' + col[2] + ')';
            //     ctx.beginPath();
            //     ctx.arc(pnt.x, pnt.y, 8, 0, PI2, false);
            //     ctx.stroke();

            //     ctx.textAlign = 'center';
            //     ctx.textBaseline = 'middle';
            //     ctx.fillStyle = 'rgb(0, 0, 0)';
            //     ctx.fillText(Math.round(pnt.value), pnt.x, pnt.y);
            // }

            if (typeof callback === 'function') {
                callback();
            }
        });
    }

}