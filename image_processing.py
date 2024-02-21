# make function that performs image processing on array of pixels
import cv2
import numpy as np

def grayscale(pixels):
    # convert to grayscale
    return cv2.cvtColor(pixels, cv2.COLOR_BGR2GRAY) 

def Red(pixels):
    # apply red filter
    pixels[:,:,1] = 0
    pixels[:,:,2] = 0
    return pixels

def Green(pixels):
    # apply green filter
    pixels[:,:,0] = 0
    pixels[:,:,2] = 0
    return pixels

def Blue(pixels):
    # apply blue filter
    pixels[:,:,0] = 0
    pixels[:,:,1] = 0
    return pixels

def Blur(pixels):
    # apply gaussian blur
    return cv2.GaussianBlur(pixels, (21, 21), 0)

def Rainbow(pixels): 
    # apply pride filter vertically
    height, width, _ = pixels.shape
    alpha = 0.5  # Adjust this value to control the intensity of the pride flag tint

    for i in range(height):
        for j in range(width):
            if j < width // 6:
                flag_color = [255, 0, 0]
            elif j < 2 * width // 6:
                flag_color = [255, 165, 0]
            elif j < 3 * width // 6:
                flag_color = [255, 255, 0]
            elif j < 4 * width // 6:
                flag_color = [0, 128, 0]
            elif j < 5 * width // 6:
                flag_color = [0, 0, 255]
            else:
                flag_color = [75, 0, 130]

            # Blend the original pixel with the flag color
            original_pixel = pixels[i, j]
            pixels[i, j] = [
                int(alpha * original_pixel[k] + (1 - alpha) * flag_color[k])
                for k in range(3)
            ]

    return pixels

def EdgeDetection(pixels):
    # apply edge detection
    return cv2.Canny(pixels, 100, 200)

def Frame(pixels):
    # apply frame
    pixels = cv2.copyMakeBorder(pixels, 10, 10, 10, 10, cv2.BORDER_CONSTANT, value=[255, 0, 0])
    return pixels


def stringToFunction(pixelArray, filterName):
    # apply filter
    # convert pixelArray to numpy array

    try:
        pixelArray = np.array(pixelArray,dtype=np.uint8)
    except:
        return "Error: Invalid pixel array"

    pixels=[]
    if filterName == 'grayScale':
        pixels = grayscale(pixelArray)
    elif filterName == 'red':
        pixels = Red(pixelArray)
    elif filterName == 'green':
        pixels = Green(pixelArray)
    elif filterName == 'blue':
        pixels = Blue(pixelArray)
    elif filterName == 'blur':
        pixels = Blur(pixelArray)
    elif filterName == 'rainbow':
        pixels = Rainbow(pixelArray)
    elif filterName == 'edgeDetection':
        pixels = EdgeDetection(pixelArray)
    elif filterName == 'frame':
        pixels = Frame(pixelArray)
    # convert 3D array to string
    return pixels