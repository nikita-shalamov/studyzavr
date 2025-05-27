import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  MessageCircle,
  ClipboardList,
  Star,
  Users,
  Clock,
  Award,
  Mail,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="#">
            <Image src="/images/logo-mini.webp" alt="" width={32} height={32} />
          <span className="ml-2 text-xl font-bold text-gray-900">Studyzavr</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 mr-4">
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#features">
          Возможности
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#testimonials">
            Отзывы
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#contact">
            Контакты
          </Link>
        </nav>
        <div className="ml-4 flex gap-2">
        <Link href="/login">
          <Button variant="outline" size="default">
            Ученик
          </Button>
          </Link>
          <Link href="/login">
          <Button size="default" className="bg-blue-600 hover:bg-blue-700">
            Преподаватель
          </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-2 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-5">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    🎓 Репетиторы рекомендуют
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900">
                    Платформа для удобного взаимодействия с учениками
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                  Ведите расписание, публикуйте домашние задания, управляйте учениками и уроками — всё в одном месте. 
                  Освободите время для того, что важно — качественного обучения.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Я преподаватель
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="lg">
                      Я ученик
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>500+ Преподавателей</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>4.9/5 Средняя оценка</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  alt="Students learning online"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-lg"
                  height="400"
                  src="/images/student-and-teacher.jpg"
                  width="600"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 lg:pb-5 bg-gray-50">
          <div className="container px-6 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Возможности
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 max-w-[900px]">
                  Всё для комфортной и эффективной работы репетитора
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Наша платформа предоставляет все инструменты для эффективного онлайн-обучения.
                </p>
              </div>
            </div>
            <div className="mx-auto flex w-full gap-6 py-12 items-start justify-center flex-wrap">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow max-w-[350px]">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Расписание</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">
                    Простой и понятный календарь. Создавайте уроки, назначайте регулярные занятия и получайте напоминания автоматически.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow max-w-[350px] ">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <ClipboardList className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Домашние задания</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">
                  Публикуйте задания, прикрепляйте файлы, проверяйте выполненные работы — всё в одном месте, без лишней переписки.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow max-w-[350px]">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <MessageCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Удобная коммуникация</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">
                    Добавляйте Zoom-ссылки, делитесь файлами и сообщениями. Оставайтесь на связи с учениками между занятиями.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow max-w-[350px]">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Отслеживайте прогресс</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">
                    С расписанием занятий и домашними заданиями вы можете отслеживать прогресс уроков.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow max-w-[350px]">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Ученики</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">
                    Ведите список ваших учеников, добавляйте новых по уникальной ссылке и удаляйте в пару кликов.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Отзывы
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">Что говорят о платформе наши пользователи</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Тысячи учеников и репетиторов уже упростили процесс обучения с помощью нашей платформы.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      {/* <AvatarImage src="https://images.unsplash.com/broken" /> */}
                      <AvatarFallback>А</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Александра</CardTitle>
                      <CardDescription>Учащаяся старших классов</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600">
                  Благодаря платформе я подняла оценку по математике с 3 до 5 баллов! Репетитор всё объяснял понятно, а расписание занятий было всегда под рукой.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>М</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Наталья Геннадьевна</CardTitle>
                      <CardDescription>Репетитор по математике</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600">
                  Studyzavr - удобная платформа: расписание, домашние задания и зум-ссылки — всё под рукой. Работать стало удобнее и быстрее.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>EМ</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Елизавета Морозова</CardTitle>
                      <CardDescription>Мама ученицы 6 класса</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600">
                    Как мама, я рада, что могу видеть успехи дочки. Интерфейс простой, а репетиторы действительно заботятся о результате. Рекомендую!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Готовы упростить обучение и начать работать эффективнее?
                </h2>
                <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto mt-10">
                  Присоединяйтесь к платформе, где учиться и преподавать — удобно, просто и результативно.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row mt-10 justify-center items-center">
                  <Link href="/login">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Начать учиться
                  </Button>
                  </Link>
                  <Link href="/login">
                  <Button
                    variant="outline"
                    size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Начать преподавать
                </Button>
                </Link>
              </div>
              </div>
              
            </div>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50"
      >
        <div className="container mx-auto">
          <div className="flex justify-between">
            <div className="space-y-4 max-w-[300px]">
              <div className="flex items-center space-x-2">
                <Image src="/images/logo-mini.webp" alt="" width={32} height={32} />
                <span className="text-xl font-bold text-gray-900">Studyzavr</span>
              </div>
              <p className="text-sm text-gray-600">
                Онлайн-платформа для репетиторов и учеников — всё для удобного обучения и преподавания.
              </p>
            </div>

            <div className="flex w-fit gap-20">
              <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Платформа</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/student/schedule" className="text-gray-600 hover:text-blue-600">
                    Расписание
                  </Link>
                </li>
                <li>
                  <Link href="/student/homework" className="text-gray-600 hover:text-blue-600">
                    Домашние задания
                  </Link>
                </li>
                <li>
                  <Link href="/student/schedule" className="text-gray-600 hover:text-blue-600">
                    Уроки
                  </Link>
                </li>
                <li>
                  <Link href="/teacher/students" className="text-gray-600 hover:text-blue-600">
                    Ученики
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Контакты</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:studyzavr@gmail.com" className="hover:text-blue-600 transition-colors">
                    studyzavr@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Москва, Россия</span>
                </div>
              </div>
            </div>
            </div>
            
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              © {new Date().getFullYear()} Studyzavr. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
