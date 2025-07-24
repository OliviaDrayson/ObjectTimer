# ObjectTimer
The Object Timer is a web-based tool for manual scoring of rodent neurobehavioural assessments [1]. It is designed for object based tasks including Novel Object Recognition (NOR)[1-5,7-8], Object Location Memory (OLM)[4], Object in Updated Location (OUL)[1,5-6], Object in Place (OiP)[1,7-8] and Temporal Order (TO)[1,8] assessments. The exploration time of up to 4 objects can be scored simultaneously and both summary data and chronological timestamp data can be exported. 

## Features
- **Precise Timing System**: Scoring initiated with adjustable countdown. 
- **Multiple Timer Buttons**: Key press and/or click operated timer buttons for scoring of up to 4 objects.
- **Data Recording**: 
  - Timer location
  - Object description (optional)
  - Timestamp (ms since countdown started)
  - Press duration (ms) (either summary for each object (xlsx) or full event sequence (csv))
- **Export Options**: 
  - Excel file export
  - CSV file export

## Getting Started

### Prerequisites
- Web browser with JavaScript support

### Usage
Access and use the tool at: http://OliviaDrayson.github.io/ObjectTimer

1. Enter the project, test, round and arena information in the user input boxes (all info will be added to output file name).
2. Set timer for test duration.
3. (Optional) Enter description for each object being scored (e.g Green Triangle) 
4. Open and play video file in a separate application.
5. Start countdown and hold down keys while animal is exploring the relevant object ('a' for top left, 'z' for bottom left, 'k' for top right and 'm' for bottom right).
6. When the countdown ends the timers are deactivated. Countdown can be paused and resumed.
7. Save the scores either as a summary per object with the 'Save to Excel' button (total exploration time of each object, excel format) or as full press sequence with the 'Export Row Data' button (duration and timestamp of each press, csv format).
8. When repeating for a new arena, reset all timers with the 'Reset All' button and change the arena number (reset button does not clear any user inputs). 

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/OliviaDrayson/ObjectTimer.git

## References
[1] Drayson OGG, Vozenin MC, Limoli CL. A rigorous behavioral testing platform for the assessment of radiation-induced neurological outcomes. Methods Cell Biol. 2023;180:177-197. doi:10.1016/bs.mcb.2023.02.015

[2] Ennaceur A, Meliani K. A new one-trial test for neurobiological studies of memory in rats. III. Spatial vs. non-spatial working memory. Behav Brain Res. 1992;51(1):83-92. doi:10.1016/s0166-4328(05)80315-8

[3] Lueptow LM. Novel Object Recognition Test for the Investigation of Learning and Memory in Mice. J Vis Exp. 2017;(126):55718. Published 2017 Aug 30. doi:10.3791/55718

[4] Vogel-Ciernia A, Wood MA. Examining object location and object recognition memory in mice. Curr Protoc Neurosci. 2014;69:8.31.1-8.31.17. Published 2014 Oct 8. doi:10.1002/0471142301.ns0831s69

[5] Alaghband Y, Cheeks SN, Allen BD, et al. Neuroprotection of Radiosensitive Juvenile Mice by Ultra-High Dose Rate FLASH Irradiation. Cancers (Basel). 2020;12(6):1671. Published 2020 Jun 24. doi:10.3390/cancers12061671

[6] Kwapis JL, Alaghband Y, Keiser AA, et al. Aging mice show impaired memory updating in the novel OUL updating paradigm. Neuropsychopharmacology. 2020;45(2):337-346. doi:10.1038/s41386-019-0438-0

[7] Parihar VK, Allen BD, Tran KK, et al. Targeted overexpression of mitochondrial catalase prevents radiation-induced cognitive dysfunction. Antioxid Redox Signal. 2015;22(1):78-91. doi:10.1089/ars.2014.5929

[8] Parihar, V., Allen, B., Caressi, C. et al. Cosmic radiation exposure and persistent cognitive dysfunction. Sci Rep 6, 34774 (2016). doi:10.1038/srep34774

## Contact
For questions, suggestions or issues please contact Olivia Drayson at drayson.o@mac.com
