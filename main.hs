import Data.Digits (digits)
import Data.Vector (Vector, fromList, elemIndex)
import Data.Maybe (fromMaybe)

-- Generate the first n digits of Pi
generatePiDigits :: Int -> Vector Int
generatePiDigits n = fromList $ take n $ digits 10 pi

-- Find the index of a sequence in a list
findSequence :: Vector Int -> Vector Int -> Int
findSequence sequence list = fromMaybe (-1) $ elemIndex sequence list

main :: IO ()
main = do
    putStrLn "Enter a 1-5 digit number:"
    number <- getLine
    let digitsOfNumber = fromList $ digits 10 (read number :: Int)
    let piDigits = generatePiDigits 10000
    let index = findSequence digitsOfNumber piDigits
    if index == -1
        then putStrLn "Number not found in the first 10000 digits of Pi."
        else putStrLn $ "Number found at position " ++ show (index + 1) ++ " in the first 10000 digits of Pi."