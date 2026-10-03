import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CounterHook } from './src/components/CounterHook';
import { Greeting } from './src/components/Greeting';
import { SectionCard } from './src/components/SectionCard';
import { StudentInfo } from './src/components/StudentInfo';
import { students } from './src/data/students';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>REACT NATIVE · COMPONENTS</Text>
          <Text style={styles.title}>Bài luyện tập thực hành</Text>
          <Text style={styles.subtitle}>
            Minh họa props, khả năng tái sử dụng component và state với Hooks.
          </Text>
        </View>

        <SectionCard
          number="01"
          title="Greeting"
          description="Một component nhận name qua props và được tái sử dụng với hai giá trị khác nhau."
        >
          <View style={styles.greetingList}>
            <Greeting name="Nguyễn Văn An" />
            <Greeting name="Trần Thu Hà" />
          </View>
        </SectionCard>

        <SectionCard
          number="02"
          title="StudentInfo"
          description="Component con nhận họ tên, lớp và ngành học từ component cha."
        >
          <View style={styles.studentList}>
            {students.map((student) => (
              <StudentInfo key={student.id} {...student} />
            ))}
          </View>
        </SectionCard>

        <SectionCard
          number="03"
          title="CounterHook"
          description="useState lưu giá trị đếm và làm giao diện render lại sau mỗi lần cập nhật."
        >
          <CounterHook />
        </SectionCard>

        <Text style={styles.footer}>Hoàn thành 3/3 bài thực hành</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F1EA',
  },
  content: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 48,
    gap: 18,
  },
  hero: {
    paddingBottom: 14,
  },
  eyebrow: {
    color: '#B5482D',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: 12,
  },
  title: {
    color: '#1E2923',
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1.3,
    lineHeight: 40,
  },
  subtitle: {
    color: '#657069',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
    maxWidth: 560,
  },
  greetingList: {
    gap: 10,
  },
  studentList: {
    gap: 12,
  },
  footer: {
    color: '#748078',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
  },
});
