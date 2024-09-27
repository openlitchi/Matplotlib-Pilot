## [matplotlib.markers](https://matplotlib.org/stable/api/markers_api.html)

The marker can be set by `marker="marker name"` within the drawing function. The marker size is set by `markersize1=<16>`.

Here are some commonly used `marker names`.


|marker|symbol|description|
|-|-|-|
|"."|![point](image/marker/m00.webp)|point|
|","|![pixel](image/marker/m01.webp)|pixel|
|"o"|![circle](image/marker/m02.webp)|circle|
|"v"|![triangle_down](image/marker/m03.webp)|triangle_down|
|"^"|![triangle_up](image/marker/m04.webp)|triangle_up|
|"<"|![triangle_left](image/marker/m05.webp)|triangle_left|
|">"|![triangle_right](image/marker/m06.webp)|triangle_right|
|"1"|![tri_down](image/marker/m07.webp)|tri_down|
|"2"|![tri_up](image/marker/m08.webp)|tri_up|
|"3"|![tri_left](image/marker/m09.webp)|tri_left|
|"4"|![tri_right](image/marker/m10.webp)|tri_right|
|"8"|![octagon](image/marker/m11.webp)|octagon|
|"s"|![square](image/marker/m12.webp)|square|
|"p"|![pentagon](image/marker/m13.webp)|pentagon|
|"P"|![plus(filled)](image/marker/m23.webp)|plus(filled)|
|"*"|![star](image/marker/m14.webp)|star|
|"h"|![hexagon1](image/marker/m15.webp)|hexagon1|
|"H"|![hexagon2](image/marker/m16.webp)|hexagon2|
|"+"|![plus](image/marker/m17.webp)|plus|
|"x"|![x](image/marker/m18.webp)|x|
|"X"|![x(filled)](image/marker/m24.webp)|x(filled)|
|"D"|![diamond](image/marker/m19.webp)|diamond|
|"d"|![thin_diamond](image/marker/m20.webp)|thin_diamond|
|"\|"|![vline](image/marker/m21.webp)|vline|
|"_"|![hline](image/marker/m22.webp)|hline|


## [matplotlib.colors](https://matplotlib.org/stable/gallery/color/named_colors.html)

The control parameter for color is `color="color name"`. There are many forms of `color name`, including:
1. Single letter:
![Single-letter color](image/color/named_colors_2.png)
2. Word:
![Word color](image/color/named_colors_1.png)
3. Six-digit hexadecimal color value.

+ <font color="#ff0094">#ff0094</font>
+ <font color="#ff0000">#ff0000</font>
+ <font color="#000000">#000000</font>

## [colormap](https://matplotlib.org/stable/gallery/color/colormap_reference.html)

The control parameter for color mapping is `cmap="colormap name"`. Commonly used `colormap names` are:

+ `jet`: The default option for `ANSYS Fluent`.
+ `coolwarm`: The default option for `Paraview`.
+ `hot`: The default option for `Comsol`.
+ `Greys` or `gray`: Grayscale.
+ `binary`: Black and white binary.
+ All `colormap names` support `colormapname_r` to reverse.


![](image/cmap/cmap_1.png)
![](image/cmap/cmap_2.png)
![](image/cmap/cmap_3.png)
![](image/cmap/cmap_4.png)
![](image/cmap/cmap_5.png)
![](image/cmap/cmap_6.png)
![](image/cmap/cmap_7.png)
![](image/cmap/cmap_8.png)


## [linestyles](https://matplotlib.org/stable/gallery/lines_bars_and_markers/linestyles.html)

The line style parameter can be set by `linestyle="linestyle name"`. The line width is controlled by `linewidth=<2>` or `lw=<2>`. Commonly used `linestyle names` are:

+ `solid`: Solid line.
+ `dotted`: Dotted line.
+ `dashed`: Dashed line.
+ `dashdot`: Dash-dot line.

The line style can also be controlled by a tuple `(a, (b, c,...))`, where:

+ `a`: The repetition mode of the line, usually 0.
+ `b`: The length of the line segment.
+ `c`: The length of the blank space.
+ `d`: The length of the next line segment (optional).
+ `e`: The length of the next blank space (optional).

Here are some effects.
![linestyle](image/ls/linestyle.png)


## [matplotlib.hatch](https://matplotlib.org/stable/gallery/shapes_and_collections/hatch_style_reference.html)

The `hatch` parameter can be used to specify the fill value of a `patch` object in some plotting functions. This is often used in some [bar charts](https://matplotlib.org/stable/gallery/shapes_and_collections/hatch_demo.html) to distinguish different groups of data.

Here are some possible values for the `hatch` parameter:
1. A single character determines the style.
![Single character](image/hatch/hatch_1.webp)
2. Repeating characters can increase the density.
![Repeating characters](image/hatch/hatch_2.webp)
3. Combining characters can combine styles.
![Combined characters](image/hatch/hatch_3.webp)


## [matplotlib.style](https://matplotlib.org/stable/gallery/style_sheets/style_sheets_reference.html)

You can use `plt.style.use('bmh')` to set the corresponding style. The style string name can be printed by using `print(plt.style.available)`. After installing some libraries (such as `pip install SciencePlots`), more styles can be used.

Here are some built-in styles.


![bmh](image/style/bmh.png)
![fivethirtyeight](image/style/fivethirtyeight.png)
![seaborn-v0_8-bright](image/style/seaborn-v0_8-bright.png)
![seaborn-v0_8-dark-palette](image/style/seaborn-v0_8-dark-palette.png)
![seaborn-v0_8-paper](image/style/seaborn-v0_8-paper.png)
![seaborn-v0_8-ticks](image/style/seaborn-v0_8-ticks.png)
![tableau-colorblind10](image/style/tableau-colorblind10.png)
![dark_background](image/style/dark_background.png)
![ggplot](image/style/ggplot.png)
![seaborn-v0_8-colorblind](image/style/seaborn-v0_8-colorblind.png)
![seaborn-v0_8-deep](image/style/seaborn-v0_8-deep.png)
![seaborn-v0_8-muted](image/style/seaborn-v0_8-muted.png)
![seaborn-v0_8-pastel](image/style/seaborn-v0_8-pastel.png)
![seaborn-v0_8-poster](image/style/seaborn-v0_8-poster.png)
![seaborn-v0_8-talk](image/style/seaborn-v0_8-talk.png)
![default](image/style/default.png)
![grayscale](image/style/grayscale.png)
![seaborn-v0_8-dark](image/style/seaborn-v0_8-dark.png)
![seaborn-v0_8-darkgrid](image/style/seaborn-v0_8-darkgrid.png)
![seaborn-v0_8-notebook](image/style/seaborn-v0_8-notebook.png)
![seaborn-v0_8-white](image/style/seaborn-v0_8-white.png)
![seaborn-v0_8-whitegrid](image/style/seaborn-v0_8-whitegrid.png)
![fast](image/style/fast.png)
![seaborn-v0_8](image/style/seaborn-v0_8.png)
![Solarize_Light2](image/style/Solarize_Light2.png)
