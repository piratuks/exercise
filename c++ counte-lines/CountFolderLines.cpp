#include <iostream>
#include <fstream>
#include <thread>
#include <future>
#include <vector>
#include <numeric>
#include <boost/filesystem.hpp>

namespace fileSystem = boost::filesystem;

bool includesString(const std::vector<std::string>& array, const std::string& value) {
    return std::find(array.begin(), array.end(), value) != array.end();
}

int countLinesOfFile(const std::string& path) {
    std::ifstream file(path);
    if (!file.is_open()) {
        std::cerr << "Unable to open file: " << path << std::endl;
        return 0;
    }

    int lines = 0;
    std::string line;
    while (std::getline(file, line)) {
        ++lines;
    }

    file.close();
    return lines;
}

int countLinesOfDir(const std::string& path, const std::vector<std::string>& extensions) {
    int lines = 0;
    std::vector<std::future<int>> promiseResults;

    for (const auto& item : fileSystem::directory_iterator(path)) {
        if (fileSystem::is_regular_file(item) && includesString(extensions, item.path().extension().string()) ) {
            promiseResults.emplace_back(std::async(std::launch::async, countLinesOfFile, item.path().string()));
        }
    }
    for (auto& item : promiseResults) {
        lines += item.get();
    }

    return lines;
}

int main(int argc, char* argv[]) {
//---------using command line arguments as input-------------------
    if (argc != 2) {
        std::cerr << "Usage: " << "linecounter" << " <path-to-a-directory>" << std::endl;
        return 1;
    }
    std::string path = argv[1];

//---------using input commands-----------------------------------
    //std::string path;
    //std::cout << "Enter the dir path: ";
    //std::cin >> path;

//----------------------------------------------------------------
    int result = countLinesOfDir(path, { ".txt" });
    std::cout << "Total number of lines: " << result << std::endl;


    return 0;
}