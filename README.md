# Toontown Offline Filters

* In Toontown Offline, users with glsl shader experience can create custom effects
* This can be achieved by adding the shader files into the filters directory

![image](https://user-images.githubusercontent.com/31282527/109550459-4fab1b80-7a9d-11eb-8f56-30ac40db6904.png)

(An example of a post process shader with a fragment shader)

# Filter Types
* There are two types of filters; Post Process and Render shaders
* All shaders require a Vertex shader and a Fragment shader file

## Render Shaders
* Render shaders are computed during rendering, and affect the actual objects in 3D space
* Render shaders can be used to make calculations based on models themselves, like adding artificial lighting based on their normals, adjusting vertex positions, and making calculations based on the textures of the models themselves.
* Render shaders should have custom fragment and vertex shader files
* In Toontown Offline v1.0.5.1, the Drunk, Rainbow, Rainbow Gradient, and Desaturate filters use this method, however, all, except for the Drunk filter, can and should be done as Post Process, but they were programmed before support for Post Process shaders was added.

## Post Process shaders
* Post process shaders are computed after the 3D scene is rendered, and is applied to the screen itself, as opposed to the 3D objects. The majority of filters would be done in this method.
* Post process shaders never have a reason for a custom vertex shader file, so the vertex file should always be specified as `"phase_3/shaders/tt_sha_post_generic.vert"`
* In Toontown Offline v1.0.5.1, the Underwater filter uses this method.
* As of Toontown Offline v1.0.5.1, post process shaders have access to the color and depth buffers. Currently, these are required to be specified as inputs, even if one of those is not going to be used.
* All post process fragment shaders are required to have the following inputs, even if they aren't used:
	* Color texture (`uniform sampler2D color_texture`)
	* Depth texture (`uniform sampler2D depth_texture`)
	* Screen resolution (`uniform vec2 resolution`)
* The most common other input (which is not required) is the `uniform float osg_FrameTime` which, as described by [Panda3D's manual](https://docs.panda3d.org/1.10/python/programming/shaders/list-of-glsl-inputs), "reports the frame time of the current frame, for animations."


## JSON File
* Each filter needs a JSON file. This file can be placed alongside your shader vertex and fragment files in the `filters` folder in your Toontown Offline game directory (which can be accessed by pressing the ![directory](https://user-images.githubusercontent.com/31282527/109549132-8a13b900-7a9b-11eb-879a-17c2c9d646a8.png) button on the launcher.
* Each JSON file needs specific data about the shader, and MUST be formatted correctly!
* An example Post Process filter JSON file is shown below:
```json
{
	"display_name" : "Red Tint",
	"identifier" : "drewcification:red",
	"mw_identifiers" : ["example", "red", "redtint"],
	"fragment" : "filters/tt_sha_post_example.frag",
	"vertex" : "phase_3/shaders/tt_sha_post_generic.vert",
	"type" : "postprocess"
}
```
Key | Description
--- | ---
display_name | The display name of the filter. This is currently just used in the return message of the ~filter command, and is not required to be unique.
identifier | This is a UNIQUE identifier for the shader. This is used internally by the game to identify each filter. This MUST be unique or the shader will REFUSE to register. This identifier should always be formatted as `namespace:filtername`, where namespace can be whatever you want, such as your name. This ensures two similar shaders can always be uniquely accessed with no conflicts. The user can also use this identifier in the ~filter command.
mw_identifiers | This is a list of simple convenient words used during the ~filter command to save time. These SHOULD be unique, but in the case of a conflict, the command will pick whichever shader was registered first. If there is a conflict, the user can always just use the unique `identifier` instead.
fragment | This is the file path to the fragment shader file. If you are using a custom shader, this should pretty much always be in the filters/ folder (`e.g. filters/shader_example.frag`)
vertex | This is the file path to the vertex shader file. This should only really be used in a RENDER shader, in which case this should pretty much always be in the filters/ folder (e.g. `filters/shader_example.vert`). If you are using a post process shader, you are better off specifying the default post process vertex shader, `phase_3/shaders/tt_sha_post_generic.vert`
type | This specifies the shader type. This must be either `postprocess` or `render`. As of Toontown Offline v1.0.5.1, the capitalization does matter.
