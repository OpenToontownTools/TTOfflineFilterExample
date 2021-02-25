// Postprocess Example | Fragment
#version 130

// These 3 are required by the filter manager to be present
uniform sampler2D color_texture;
uniform sampler2D depth_texture;
uniform vec2 resolution;

// This can be used for making animations
uniform float osg_FrameTime;

in vec2 texcoord;
out vec4 color;

void main() {
	color = texture(color_texture, texcoord);
	
	// After here we can make a change we want
	// For example, we can tint the screen red by lowering the green and blue amounts
	color.gb /= 3;
}
